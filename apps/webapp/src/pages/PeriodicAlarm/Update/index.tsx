import {
  Languages,
  PeriodicAlarmReq,
  UserViewPermission,
  ViewPermissionsType,
  useGetAlarmDetails,
  useUpdatePeriodicAlarm,
} from '@rhino/apis';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  PeriodicAlarmSchema,
  buildPeriodicAlarmSchema,
} from '../Create/validation';
import {
  PeriodicAlarmCompareWith,
  PeriodicAlarmPeriod,
  PeriodicAlarmThresholdType,
  SelectedMediumType,
} from '../types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@mantine/core';
import { MeasurementWithConfig } from 'apps/webapp/src/components/measurement/SelectMeasurement/types';
import message from 'apps/webapp/src/components/notifier';
import PageTitle from 'apps/webapp/src/components/typography/PageTitle';
import { GUIDE_LINKS } from 'apps/webapp/src/constant/guide-links';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import MainLayout from 'apps/webapp/src/layouts/MainLayout';
import { locations } from 'apps/webapp/src/routes/locations';
import AccessAuthorizer from 'apps/webapp/src/wrappers/AccessAuthorizer';
import { useTranslation } from 'react-i18next';
import {
  shouldShowStartAndEndThresholdValue,
  shouldShowThresholdValue,
} from '../Create/helper';
import AlarmCriteria from '../Create/sections/AlarmCriteria';
import BasicInformation from '../Create/sections/BasicInformation';
import FormFooter from '../Create/sections/FormFooter';
import MomentOfExecution from '../Create/sections/MomentOfExecution';
import RecipientDetails from '../Create/sections/RecipientDetails';
import TimeConfiguration from '../Create/sections/TimeConfiguration';
import { onError } from '../helper';

const UpdatePeriodicAlarm = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const { t } = useTranslation('periodicAlarm');
  const { client, location, group, setClient } = useUserFilter();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const { mutate: updateAlarm, isPending } = useUpdatePeriodicAlarm(
    uuid as string
  );

  const {
    data: alarmDetails,
    isLoading,
    isError,
    error,
  } = useGetAlarmDetails(uuid as string);

  const [selectedMediumType, setSelectedMediumType] =
    useState<SelectedMediumType | null>(null);

  const schema = useMemo(() => buildPeriodicAlarmSchema(t), [t]);

  const methods = useForm<PeriodicAlarmSchema>({
    mode: 'onChange',
    defaultValues: {
      analysePeriod: PeriodicAlarmPeriod.LAST_DAY,
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

  const { handleSubmit, reset, setValue } = methods;

  const initialMeasurements = useMemo(() => {
    if (!alarmDetails?.data?.measurements) return [];

    return alarmDetails.data.measurements.map((measurement) => ({
      measurement: measurement,
      config: {
        startDate: null,
        endDate: null,
        selectionId: new Date().getTime() + '-' + measurement.uuid,
      },
    })) as MeasurementWithConfig[];
  }, [alarmDetails?.data?.measurements]);

  useEffect(() => {
    if (!alarmDetails?.data) return;

    setClient({
      name: alarmDetails.data.client.name,
      uuid: alarmDetails.data.client.uuid,
    });

    setSelectedMediumType({
      mappId: alarmDetails.data.meteringPointTypeDto.mappId,
      name: alarmDetails.data.meteringPointTypeDto.name,
      unit: alarmDetails.data.meteringPointTypeDto.unit,
    });

    setIsReadOnly(!alarmDetails?.data?.isManageable);

    requestAnimationFrame(() => {
      const formData: PeriodicAlarmSchema = {
        name: alarmDetails.data.name,
        clientUuid: alarmDetails.data.client.uuid,
        frequency: alarmDetails.data.frequency,
        analysePeriod:
          (alarmDetails.data.analysePeriod as PeriodicAlarmPeriod) ||
          PeriodicAlarmPeriod.LAST_DAY,
        comparisonMeasure: alarmDetails.data.configuration?.comparisonMeasure,
        compareWithPeriod: alarmDetails.data.compareWithPeriod,
        timezone: alarmDetails.data.timezone || 'Europe/Warsaw',
        language: alarmDetails.data.configuration.language || Languages.PL,
        isActive: alarmDetails.data.active,
        readOnly: alarmDetails.data.readOnly,
        shared: alarmDetails.data.shared,
        sharedLocations:
          alarmDetails.data.sharedLocalisations?.map(
            (location) => location.uuid
          ) || [],
        sharedTenants:
          alarmDetails.data.sharedTenants?.map((tenant) => tenant.uuid) || [],
        recipientEmails: alarmDetails.data.recipientDetails?.emails || [],
        phoneNumber: alarmDetails.data.recipientDetails?.phoneNumbers || [],
        measurementUuids:
          alarmDetails.data.measurements?.map(
            (measurement) => measurement.uuid
          ) || [],
        sendOnlyWhenExceeded:
          alarmDetails.data.configuration?.sendOnlyWhenExceeded ?? true,
        generationDay: alarmDetails.data.configuration?.generationDay ?? null,
        generationTime: alarmDetails.data.configuration?.generationTime,
        delayInDays: alarmDetails.data.configuration?.delayInDays,
        thresholdType: alarmDetails.data.configuration?.thresholdType,
        thresholdValue:
          alarmDetails.data.configuration?.thresholdValue ?? undefined,
        thresholdStartValue:
          alarmDetails.data.configuration?.thresholdStartValue ?? undefined,
        thresholdEndValue:
          alarmDetails.data.configuration?.thresholdEndValue ?? undefined,
        meteringPointTypeId: alarmDetails.data.meteringPointTypeDto?.id,
      };

      reset(formData);
      setIsFormInitialized(true);
    });
  }, [alarmDetails?.data, reset, setClient]);

  useEffect(() => {
    if (isError) {
      navigate(locations.alarm.periodic.base, {
        state: { isError: true, errMessage: error.message },
      });
    }
  }, [isError, navigate, error]);

  const resetThresholdValues = useCallback(() => {
    setValue('thresholdType', '');
    setValue('thresholdValue', undefined);
    setValue('thresholdStartValue', undefined);
    setValue('thresholdEndValue', undefined);
  }, [setValue]);

  const onSubmit = (values: PeriodicAlarmSchema) => {
    updateAlarm(buildPeriodicAlarmUpdateForm(values), {
      onSuccess: () => {
        navigate(
          locations.alarm.periodic.base +
            getRibbonParams({
              client: client,
              location: location,
              group: group,
            }),
          {
            state: { isUpdated: true },
          }
        );
      },
      onError: (error: Error | { error: string; message: string }) => {
        const errMessage =
          ('error' in error ? error.error : '') +
            ('message' in error ? error.message : '') || t('update.error');

        message.error(
          errMessage ?? t('toast.somethingWentWrong', { ns: 'common' })
        );
      },
    });
  };

  const buildPeriodicAlarmUpdateForm = useCallback(
    (values: PeriodicAlarmSchema) => {
      const formData: PeriodicAlarmReq = {
        name: values.name,
        clientUuid: values.clientUuid,
        meteringPointTypeId: values.meteringPointTypeId,
        measurementUuids: values.measurementUuids,
        configuration: {
          generationDay: values.generationDay ?? 1,
          generationTime: values.generationTime,
          delayInDays: values.delayInDays,
          comparisonMeasure: values.comparisonMeasure,
          thresholdType: values.thresholdType,
          ...(values.thresholdValue !== null &&
            values.thresholdValue !== undefined && {
              thresholdValue: values.thresholdValue,
            }),
          ...(values.thresholdStartValue !== null &&
            values.thresholdStartValue !== undefined && {
              thresholdStartValue: values.thresholdStartValue,
            }),
          ...(values.thresholdEndValue !== null &&
            values.thresholdEndValue !== undefined && {
              thresholdEndValue: values.thresholdEndValue,
            }),
          sendOnlyWhenExceeded: values.sendOnlyWhenExceeded,
          language: values.language,
        },
        ...((!!values.recipientEmails?.length ||
          !!values.phoneNumber?.length) && {
          recipients: {
            ...(!!values.recipientEmails && { emails: values.recipientEmails }),
            ...(!!values.phoneNumber && { phoneNumbers: values.phoneNumber }),
          },
        }),
        frequency: values.frequency,
        shared: values.shared,
        readOnly: values.readOnly,
        active: values.isActive,
        timezone: values.timezone,
        ...(!!values.sharedLocations && {
          sharedLocalisationUuids: values.sharedLocations,
        }),
        ...(!!values.sharedTenants && {
          sharedTenantUuids: values.sharedTenants,
        }),
        compareWithPeriod: values.compareWithPeriod,
        analysePeriod: values.analysePeriod,
      };

      if (!alarmDetails?.data.hasCreatorAccess) {
        formData.shared = false;
        formData.readOnly = false;
        formData.sharedLocalisationUuids = [];
        formData.sharedTenantUuids = [];
      }

      if (
        !shouldShowThresholdValue(
          values.compareWithPeriod as PeriodicAlarmCompareWith,
          values.thresholdType as PeriodicAlarmThresholdType
        )
      ) {
        formData.configuration.thresholdValue = null;
      }

      if (
        !shouldShowStartAndEndThresholdValue(
          values.thresholdType as PeriodicAlarmThresholdType
        )
      ) {
        formData.configuration.thresholdStartValue = null;
        formData.configuration.thresholdEndValue = null;
      }

      return formData;
    },
    [alarmDetails?.data.hasCreatorAccess]
  );

  const shouldShowForm = !isLoading && isFormInitialized && alarmDetails?.data;

  return (
    <AccessAuthorizer
      viewPermissionType={ViewPermissionsType.ViewRoleBased}
      viewPermissions={[UserViewPermission.PERIODIC_ALARM_ROLE]}
    >
      <MainLayout
        title={
          isReadOnly ? t('update.mainHeaderReadOnly') : t('update.mainHeader')
        }
        topRibbon={{
          hideFavoriteMeter: true,
          hideGroup: true,
          hideLocations: true,
          disableClient: true,
          disableLocation: true,
          disableGroup: true,
        }}
      >
        {!shouldShowForm ? (
          <div className="flex justify-center items-center h-64">
            <Loader color="var(--color-rhino-indigo-blue)" size={24} />
          </div>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={(e) => void handleSubmit(onSubmit, onError)(e)}>
              <div className="flex flex-col gap-20 mb-20">
                <div>
                  <PageTitle
                    title={
                      isReadOnly
                        ? t('update.mainHeaderReadOnly')
                        : t('update.mainHeader')
                    }
                    guide={true}
                    guideLink={GUIDE_LINKS.PERIODIC_ALARM}
                  />
                  <div className="grid min-lg:grid-cols-5 gap-14 w-full">
                    <div className="flex gap-8 py-2 flex-col col-span-3">
                      <BasicInformation
                        isReadOnly={isReadOnly}
                        setSelectedMediumType={setSelectedMediumType}
                        hasCreatorAccess={alarmDetails?.data.hasCreatorAccess}
                        isUpdate
                      />
                      <MomentOfExecution
                        isReadOnly={isReadOnly}
                        resetThresholdValues={resetThresholdValues}
                      />
                      <TimeConfiguration
                        isReadOnly={isReadOnly}
                        resetThresholdValues={resetThresholdValues}
                      />
                      <AlarmCriteria
                        isReadOnly={isReadOnly}
                        resetThresholdValues={resetThresholdValues}
                        selectedMediumType={selectedMediumType}
                      />
                      <RecipientDetails isReadOnly={isReadOnly} />
                    </div>
                  </div>
                </div>
              </div>
              <FormFooter
                selectedMediumTypeMappId={selectedMediumType?.mappId || null}
                isPending={isPending}
                initialMeasurements={initialMeasurements}
                isReadOnly={isReadOnly}
              />
            </form>
          </FormProvider>
        )}
      </MainLayout>
    </AccessAuthorizer>
  );
};

export default UpdatePeriodicAlarm;
