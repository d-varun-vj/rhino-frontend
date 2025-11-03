import { zodResolver } from '@hookform/resolvers/zod';
import {
  LanguageMap,
  usePostPeriodicAlarm,
  UserViewPermission,
  ViewPermissionsType,
} from '@rhino/apis';
import message from 'apps/webapp/src/components/notifier';
import PageTitle from 'apps/webapp/src/components/typography/PageTitle';
import { GUIDE_LINKS } from 'apps/webapp/src/constant/guide-links';
import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getCurrentDateAsString } from 'apps/webapp/src/helpers/date';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import MainLayout from 'apps/webapp/src/layouts/MainLayout';
import { locations } from 'apps/webapp/src/routes/locations';
import AccessAuthorizer from 'apps/webapp/src/wrappers/AccessAuthorizer';
import { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { buildPeriodicAlarmReqForm, onError } from '../helper';
import {
  DataRange,
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
} from '../types';
import { COMPARISON_METHOD_OPTIONS } from './config';
import AlarmCriteria from './sections/AlarmCriteria';
import BasicInformation from './sections/BasicInformation';
import FormFooter from './sections/FormFooter';
import MomentOfExecution from './sections/MomentOfExecution';
import RecipientDetails from './sections/RecipientDetails';
import { buildPeriodicAlarmSchema, PeriodicAlarmSchema } from './validation';

const CreatePeriodicAlarm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('periodicAlarm');
  const { client, location, group } = useUserFilter();
  const { user } = useUser();

  const { mutate: createAlarm, isPending } = usePostPeriodicAlarm();

  const schema = useMemo(() => buildPeriodicAlarmSchema(t), [t]);

  const methods = useForm<PeriodicAlarmSchema>({
    mode: 'onChange',
    defaultValues: {
      frequency: PeriodicAlarmFrequency.DAILY,
      comparisonMethod: COMPARISON_METHOD_OPTIONS[0].value,
      dataRange: DataRange.YESTERDAY,
      compareWithPeriod: PeriodicAlarmCompareWith.FIXED_VALUE,
      generationDay: 1,
      timezone: 'Europe/Warsaw',
      isActive: true,
      readOnly: true,
      shared: false,
      name: t('create.defaultName', {
        date: getCurrentDateAsString('DD-MM-YYYY HH:mm'),
      }),
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

  const { setValue, handleSubmit, resetField } = methods;

  useEffect(() => {
    setValue('clientUuid', client ? client?.uuid : '');
  }, [client, setValue]);

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
        navigate(
          locations.alarm.periodic.base +
            getRibbonParams({
              client: client,
              location: location,
              group: group,
            }),
          {
            state: { isCreated: true },
          }
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
          hideFavoriteMeter: true,
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={(e) => void handleSubmit(onSubmit, onError)(e)}>
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
                    <RecipientDetails />
                  </div>
                </div>
              </div>
            </div>
            <FormFooter isPending={isPending} />
          </form>
        </FormProvider>
      </MainLayout>
    </AccessAuthorizer>
  );
};

export default CreatePeriodicAlarm;
