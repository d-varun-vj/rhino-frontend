import { zodResolver } from '@hookform/resolvers/zod';
import {
  LanguageMap,
  usePostPeriodicAlarm,
  UserViewPermission,
  ViewPermissionsType,
} from '@rhino/apis';
import { useClearOnNavigation, useLocalStorage } from '@rhino/utils';
import { MeasurementWithConfig } from 'apps/webapp/src/components/measurement/SelectMeasurement/types';
import message from 'apps/webapp/src/components/notifier';
import PageTitle from 'apps/webapp/src/components/typography/PageTitle';
import { GUIDE_LINKS } from 'apps/webapp/src/constant/guide-links';
import { LOCAL_STORAGE_KEYS } from 'apps/webapp/src/constant/local-storage-keys';
import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getCurrentDateAsString } from 'apps/webapp/src/helpers/date';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import MainLayout from 'apps/webapp/src/layouts/MainLayout';
import { paths } from 'apps/webapp/src/routes/paths';
import AccessAuthorizer from 'apps/webapp/src/wrappers/AccessAuthorizer';
import { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { buildPeriodicAlarmReqForm, onError } from '../helper';
import {
  DataRange,
  MeasurementSortDirection,
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
} from '../types';
import { COMPARISON_METHOD_OPTIONS } from './config';
import AdvancedSettings from './sections/AdvancedSettings';
import AlarmCriteria from './sections/AlarmCriteria';
import BasicInformation from './sections/BasicInformation';
import FormFooter from './sections/FormFooter';
import MeasurementSorting from './sections/MeasurementSorting';
import MomentOfExecution from './sections/MomentOfExecution';
import RecipientDetails from './sections/RecipientDetails';
import { buildPeriodicAlarmSchema, PeriodicAlarmSchema } from './validation';

const MEASUREMENT_STORAGE_KEY =
  LOCAL_STORAGE_KEYS.PERIODIC_ALARM.CREATE_MEASUREMENTS;

const CreatePeriodicAlarm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('periodicAlarm');
  const { clients, locations, groups } = useUserFilter();
  const { user } = useUser();

  const { mutate: createAlarm, isPending } = usePostPeriodicAlarm();
  const { clear } = useLocalStorage<MeasurementWithConfig[]>(
    MEASUREMENT_STORAGE_KEY
  );

  useClearOnNavigation({
    onNavigate: (destinationPath) => {
      const isStillCreatePage = destinationPath.includes(
        paths.alarm.periodic.create
      );
      if (!isStillCreatePage) {
        clear();
      }
    },
  });

  const schema = useMemo(() => buildPeriodicAlarmSchema(t), [t]);

  const methods = useForm<PeriodicAlarmSchema>({
    mode: 'onChange',
    defaultValues: {
      frequency: PeriodicAlarmFrequency.DAILY,
      comparisonMethod: COMPARISON_METHOD_OPTIONS[0].value,
      dataRange: DataRange.YESTERDAY,
      compareWithPeriod: PeriodicAlarmCompareWith.DAY_BEFORE,
      generationDay: 1,
      timezone: 'Europe/Warsaw',
      isActive: true,
      readOnly: true,
      shared: false,
      name: t('create.defaultName', {
        date: getCurrentDateAsString('DD-MM-YYYY HH:mm'),
      }),
      sortDirection: MeasurementSortDirection.ASC,
      generationTime: '07:00',
      delayInDays: 0,
      sharedLocations: [],
      sharedTenants: [],
      recipientEmails: [],
      phoneNumber: [],
      measurementUuids: [],
      sendOnlyWhenExceeded: true,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user?.email) {
      methods.reset({ ...methods.getValues(), recipientEmails: [user.email] });
    }
  }, [user, methods]);

  const { setValue, handleSubmit, resetField } = methods;

  useEffect(() => {
    setValue('clientUuid', clients ? clients[0].uuid : '');
  }, [clients, setValue]);

  useEffect(() => {
    setValue('language', LanguageMap[(user?.language as 'pl' | 'en') || 'en']);
  }, [setValue, user?.language]);

  const resetThresholdValues = useCallback(() => {
    resetField('thresholdType');
    resetField('thresholdValue');
    resetField('thresholdStartValue');
    resetField('thresholdEndValue');
  }, [resetField]);

  const onSubmit = (values: PeriodicAlarmSchema) => {
    createAlarm(buildPeriodicAlarmReqForm(values), {
      onSuccess: () => {
        clear();
        navigate(
          paths.alarm.periodic.base +
            getRibbonParams({ clients, locations, groups }),
          { state: { isCreated: true } }
        );
      },
      onError: (error: Error | { title: string; detail: string }) => {
        const errMessage =
          ('detail' in error ? error.detail : '') || t('create.error');
        message.error(
          errMessage ?? t('toast.somethingWentWrong', { ns: 'common' })
        );
      },
    });
  };

  return (
    <AccessAuthorizer
      viewPermissionType={ViewPermissionsType.ViewRoleBased}
      viewPermissions={[UserViewPermission.PERIODIC_ALARM_ROLE]}
    >
      <MainLayout
        title={t('create.mainHeader')}
        topRibbon={{
          favoriteMeter: {
            hidden: true,
          },
        }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => {
              void handleSubmit(onSubmit, (errors) => {
                onError(errors);
              })(e);
            }}
            data-testid="periodic-alarm-create-form"
          >
            <div className="flex flex-col gap-20 mb-20">
              <div>
                <PageTitle
                  title={t('create.mainHeader')}
                  guide={true}
                  guideLink={GUIDE_LINKS.PERIODIC_ALARM}
                />
                <div className="grid min-lg:grid-cols-5 gap-14 w-full">
                  <div className="flex gap-8 py-2 flex-col col-span-3">
                    <BasicInformation />
                    <AlarmCriteria
                      resetThresholdValues={resetThresholdValues}
                    />
                    <MomentOfExecution />
                    <MeasurementSorting />
                    <RecipientDetails />
                    <AdvancedSettings />
                  </div>
                </div>
              </div>
            </div>
            <FormFooter isPending={isPending} preferLocalStorage />
          </form>
        </FormProvider>
      </MainLayout>
    </AccessAuthorizer>
  );
};

export default CreatePeriodicAlarm;
