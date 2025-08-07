import { zodResolver } from '@hookform/resolvers/zod';
import {
  usePostPeriodicAlarm,
  UserViewPermission,
  ViewPermissionsType,
} from '@rhino/apis';
import message from 'apps/webapp/src/components/notifier';
import PageTitle from 'apps/webapp/src/components/typography/PageTitle';
import { GUIDE_LINKS } from 'apps/webapp/src/constant/guide-links';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import MainLayout from 'apps/webapp/src/layouts/MainLayout';
import { locations } from 'apps/webapp/src/routes/locations';
import AccessAuthorizer from 'apps/webapp/src/wrappers/AccessAuthorizer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
  PeriodicAlarmPeriod,
} from '../types';
import { COMPARISON_MEASURE_TYPE_OPTIONS } from './config';
import { buildCreateRequestForm, onError } from './helper';
import AlarmCriteria from './sections/AlarmCriteria';
import BasicInformation from './sections/BasicInformation';
import FormFooter from './sections/FormFooter';
import MomentOfExecution from './sections/MomentOfExecution';
import RecipientDetails from './sections/RecipientDetails';
import TimeConfiguration from './sections/TimeConfiguration';
import { buildPeriodicAlarmSchema, PeriodicAlarmSchema } from './validation';

const CreatePeriodicAlarm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('periodicAlarm');
  const { client, location, group } = useUserFilter();

  const { mutate: createAlarm, isPending } = usePostPeriodicAlarm();

  const [selectedMediumType, setSelectedMediumType] = useState<{
    name: string | null;
    unit: string | null;
  } | null>(null);

  const schema = useMemo(() => buildPeriodicAlarmSchema(t), [t]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm<PeriodicAlarmSchema>({
    mode: 'all',
    defaultValues: {
      frequency: PeriodicAlarmFrequency.DAILY,
      analysePeriod: PeriodicAlarmPeriod.LAST_DAY,
      comparisonMeasure: COMPARISON_MEASURE_TYPE_OPTIONS[0].value,
      compareWithPeriod: PeriodicAlarmCompareWith.CONSTANT,
      timezone: 'Europe/Warsaw',
      isActive: true,
      readOnly: true,
      shared: false,
      sharedLocations: [],
      sharedTenants: [],
      recipientEmails: [],
      phoneNumber: [],
      measurementUuids: [],
      sendOnlyWhenExceeded: true,
    },
    resolver: zodResolver(schema),
  });

  const commonFormProps = {
    register,
    control,
    setValue,
    getValues,
    watch,
    trigger,
    errors,
  };

  useEffect(() => {
    setValue('clientUuid', client ? client?.uuid : '');
  }, [client, setValue]);

  const resetThresholdValues = useCallback(() => {
    setValue('thresholdType', '');
    setValue('thresholdValue', undefined);
    setValue('thresholdStartValue', undefined);
    setValue('thresholdEndValue', undefined);
  }, [setValue]);

  const onSubmit = (values: PeriodicAlarmSchema) => {
    createAlarm(buildCreateRequestForm(values), {
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
      onError: (error: Error | { error: string; message: string }) => {
        const errMessage =
          ('error' in error ? error.error : '') +
            ('message' in error ? error.message : '') || t('create.error');

        message.error(
          errMessage ?? t('toast.somethingWentWrong', { ns: 'common' })
        );
      },
    });
  };

  return (
    <AccessAuthorizer
      viewPermissionType={ViewPermissionsType.ViewRoleBased}
      viewPermissions={[UserViewPermission.IMMEDIATE_ALARM_ROLE]}
    >
      <MainLayout title={t('create.mainHeader')} isFavoriteMeterShow={false}>
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
                  <BasicInformation
                    {...commonFormProps}
                    setSelectedMediumType={setSelectedMediumType}
                  />
                  <MomentOfExecution
                    {...commonFormProps}
                    resetThresholdValues={resetThresholdValues}
                  />
                  <TimeConfiguration
                    {...commonFormProps}
                    resetThresholdValues={resetThresholdValues}
                  />
                  <AlarmCriteria
                    {...commonFormProps}
                    resetThresholdValues={resetThresholdValues}
                    selectedMediumType={selectedMediumType}
                  />
                  <RecipientDetails {...commonFormProps} />
                </div>
              </div>
            </div>
          </div>
          <FormFooter
            {...commonFormProps}
            selectedMediumType={selectedMediumType?.name || null}
            isPending={isPending}
          />
        </form>
      </MainLayout>
    </AccessAuthorizer>
  );
};

export default CreatePeriodicAlarm;
