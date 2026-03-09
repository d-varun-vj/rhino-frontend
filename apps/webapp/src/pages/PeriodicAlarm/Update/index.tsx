import {
  DataQueryKeys,
  Languages,
  PeriodicAlarmReq,
  UserViewPermission,
  ViewPermissionsType,
  useGetAlarmDetails,
  useUpdatePeriodicAlarm,
} from '@rhino/apis';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  PeriodicAlarmSchema,
  buildPeriodicAlarmSchema,
} from '../Create/validation';
import {
  DataRange,
  MeasurementSortDirection,
  MeasurementSortOrder,
  PeriodicAlarmCompareWith,
  PeriodicAlarmThresholdType,
} from '../types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@mantine/core';
import {
  formatLocalDateTime,
  useClearOnNavigation,
  useLocalStorage,
} from '@rhino/utils';
import { useQueryClient } from '@tanstack/react-query';
import AuditInfoCard from 'apps/webapp/src/components/common/cards/AuditInfoCard';
import { MeasurementWithConfig } from 'apps/webapp/src/components/measurement/SelectMeasurement/types';
import message from 'apps/webapp/src/components/notifier';
import PageTitle from 'apps/webapp/src/components/typography/PageTitle';
import { GUIDE_LINKS } from 'apps/webapp/src/constant/guide-links';
import { LOCAL_STORAGE_KEYS } from 'apps/webapp/src/constant/local-storage-keys';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import MainLayout from 'apps/webapp/src/layouts/MainLayout';
import { paths } from 'apps/webapp/src/routes/paths';
import AccessAuthorizer from 'apps/webapp/src/wrappers/AccessAuthorizer';
import { useTranslation } from 'react-i18next';
import {
  shouldShowStartAndEndThresholdValue,
  shouldShowThresholdValue,
} from '../Create/helper';
import AdvancedSettings from '../Create/sections/AdvancedSettings';
import AlarmCriteria from '../Create/sections/AlarmCriteria';
import BasicInformation from '../Create/sections/BasicInformation';
import FormFooter from '../Create/sections/FormFooter';
import MeasurementSorting from '../Create/sections/MeasurementSorting';
import MomentOfExecution from '../Create/sections/MomentOfExecution';
import RecipientDetails from '../Create/sections/RecipientDetails';
import { onError } from '../helper';
import { isValidUpdateMeasurementChanges } from '../helper/measurementDraft';

type MeasurementChanges = {
  alarmUuid: string;
  addedMeasurements: MeasurementWithConfig[];
  removedUuids: string[];
  orderedUuids?: string[];
};

const UpdatePeriodicAlarm = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const { t } = useTranslation('periodicAlarm');
  const { t: tCommon } = useTranslation('common');

  const { clients, locations, groups } = useUserFilter();

  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const queryClient = useQueryClient();
  const measurementChangesStorageKey = useMemo(
    () => LOCAL_STORAGE_KEYS.PERIODIC_ALARM.updateMeasurements(uuid ?? ''),
    [uuid]
  );
  const currentUpdatePathToken = useMemo(
    () => `${paths.alarm.periodic.base}/update/${uuid ?? ''}`,
    [uuid]
  );

  const { load, save, clear } = useLocalStorage<MeasurementChanges>(
    measurementChangesStorageKey
  );
  const { clear: clearPeriodicAlarmFilters } = useLocalStorage<unknown>(
    LOCAL_STORAGE_KEYS.PERIODIC_ALARM.LIST_FILTERS
  );
  const [resetMeasurements, setResetMeasurements] = useState<
    MeasurementWithConfig[] | null
  >(null);
  const [draftMeasurements, setDraftMeasurements] = useState<
    MeasurementWithConfig[] | null
  >(null);

  const { mutate: updateAlarm, isPending } = useUpdatePeriodicAlarm(
    uuid as string
  );

  const {
    data: alarmDetails,
    isLoading,
    isError,
    error,
  } = useGetAlarmDetails(uuid as string);

  const [searchParams, setSearchParams] = useSearchParams();

  useClearOnNavigation({
    onNavigate: (destinationPath) => {
      if (!destinationPath.includes(currentUpdatePathToken)) {
        clear();
      }
      if (!destinationPath.includes(paths.alarm.periodic.base)) {
        clearPeriodicAlarmFilters();
      }
    },
    deps: [currentUpdatePathToken],
  });

  const schema = useMemo(() => buildPeriodicAlarmSchema(t), [t]);

  const methods = useForm<PeriodicAlarmSchema>({
    mode: 'onChange',
    defaultValues: {
      dataRange: DataRange.YESTERDAY,
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
  const rawMeasurementUuids = useMemo(
    () =>
      initialMeasurements.map((measurement) => measurement.measurement.uuid),
    [initialMeasurements]
  );

  const buildMeasurementChanges = useCallback(
    (
      measurements: MeasurementWithConfig[],
      currentUuids: string[],
      dbUuids: string[]
    ): MeasurementChanges => {
      const currentSet = new Set(currentUuids);
      const dbSet = new Set(dbUuids);

      return {
        alarmUuid: uuid ?? '',
        addedMeasurements: measurements.filter(
          (measurement) => !dbSet.has(measurement.measurement.uuid)
        ),
        removedUuids: dbUuids.filter((uuid) => !currentSet.has(uuid)),
        orderedUuids: currentUuids,
      };
    },
    [uuid]
  );

  const applyMeasurementChanges = useCallback(
    (
      rawMeasurements: MeasurementWithConfig[],
      measurementChanges: MeasurementChanges
    ): MeasurementWithConfig[] => {
      const removedSet = new Set(measurementChanges.removedUuids);

      const updatedMeasurements = rawMeasurements
        .filter((measurement) => !removedSet.has(measurement.measurement.uuid))
        .map((measurement) => ({
          ...measurement,
          config: {
            ...measurement.config,
            selectionId:
              measurement.config.selectionId ??
              `${Date.now()}-${measurement.measurement.uuid}`,
          },
        }));

      const existingUuids = new Set(
        updatedMeasurements.map((measurement) => measurement.measurement.uuid)
      );

      measurementChanges.addedMeasurements.forEach((addedMeasurement) => {
        const uuid = addedMeasurement.measurement.uuid;
        if (existingUuids.has(uuid)) {
          return;
        }

        updatedMeasurements.push({
          ...addedMeasurement,
          config: {
            ...addedMeasurement.config,
            selectionId:
              addedMeasurement.config.selectionId ?? `${Date.now()}-${uuid}`,
          },
        });
      });

      const persistedOrder = measurementChanges.orderedUuids;
      if (!persistedOrder || persistedOrder.length === 0) {
        return updatedMeasurements;
      }

      const measurementByUuid = new Map(
        updatedMeasurements.map((measurement) => [
          measurement.measurement.uuid,
          measurement,
        ])
      );
      const orderedMeasurements: MeasurementWithConfig[] = [];

      persistedOrder.forEach((uuid) => {
        const measurement = measurementByUuid.get(uuid);
        if (!measurement) {
          return;
        }

        orderedMeasurements.push(measurement);
        measurementByUuid.delete(uuid);
      });

      measurementByUuid.forEach((measurement) => {
        orderedMeasurements.push(measurement);
      });

      return orderedMeasurements;
    },
    []
  );

  useEffect(() => {
    if (!alarmDetails?.data) return;

    searchParams.set('client', alarmDetails.data.client.uuid);
    setSearchParams(searchParams);

    setIsReadOnly(!alarmDetails?.data?.isManageable);

    let resolvedMeasurements = initialMeasurements;
    try {
      const storedMeasurementChanges = load();
      if (
        isValidUpdateMeasurementChanges<MeasurementWithConfig>(
          storedMeasurementChanges
        )
      ) {
        if (storedMeasurementChanges.alarmUuid !== (uuid ?? '')) {
          clear();
          resolvedMeasurements = initialMeasurements;
        } else {
          resolvedMeasurements = applyMeasurementChanges(
            initialMeasurements,
            storedMeasurementChanges
          );
        }
      } else if (storedMeasurementChanges) {
        clear();
      }
    } catch {
      clear();
      resolvedMeasurements = initialMeasurements;
    }

    setDraftMeasurements(resolvedMeasurements);

    requestAnimationFrame(() => {
      const formData: PeriodicAlarmSchema = {
        name: alarmDetails.data.name,
        shortName: alarmDetails.data.shortName,
        clientUuid: alarmDetails.data.client.uuid,
        frequency: alarmDetails.data.frequency,
        comparisonMethod: alarmDetails.data.configuration?.comparisonMethod,
        dataRange:
          (alarmDetails.data.dataRange as DataRange) || DataRange.YESTERDAY,
        compareWithPeriod: alarmDetails.data.compareWithPeriod,
        sortOrder: alarmDetails.data.sortOrder,
        sortDirection:
          alarmDetails.data.sortDirection || MeasurementSortDirection.ASC,
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
        measurementUuids: resolvedMeasurements.map(
          (measurement) => measurement.measurement.uuid
        ),
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
      };

      reset(formData);
      setIsFormInitialized(true);
    });
  }, [
    alarmDetails?.data,
    applyMeasurementChanges,
    clear,
    initialMeasurements,
    load,
    reset,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (isError) {
      navigate(paths.alarm.periodic.base, {
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

  const handleResetMeasurements = useCallback(() => {
    const rawMeasurements = [...initialMeasurements];
    clear();
    setValue(
      'measurementUuids',
      rawMeasurements.map((measurement) => measurement.measurement.uuid)
    );
    setResetMeasurements(rawMeasurements);
    setDraftMeasurements(rawMeasurements);
  }, [clear, initialMeasurements, setValue]);

  const handleMeasurementsChange = useCallback(
    (measurements: MeasurementWithConfig[]) => {
      const currentUuids = measurements.map(
        (measurement) => measurement.measurement.uuid
      );

      const measurementChanges = buildMeasurementChanges(
        measurements,
        currentUuids,
        rawMeasurementUuids
      );
      const hasChanges =
        measurementChanges.addedMeasurements.length > 0 ||
        measurementChanges.removedUuids.length > 0 ||
        rawMeasurementUuids.some(
          (uuid, index) => measurementChanges.orderedUuids?.[index] !== uuid
        );

      try {
        if (hasChanges) {
          save(measurementChanges);
        } else {
          clear();
        }
      } catch (error) {
        console.error(
          '[UpdatePeriodicAlarm] Failed to save measurement changes to local storage',
          error
        );
        message.error(tCommon('toast.somethingWentWrong'));
      }
    },
    [buildMeasurementChanges, clear, rawMeasurementUuids, save]
  );

  const onSubmit = (values: PeriodicAlarmSchema) => {
    updateAlarm(buildPeriodicAlarmUpdateForm(values), {
      onSuccess: () => {
        clear();
        navigate(
          paths.alarm.periodic.base +
            getRibbonParams({ clients, locations, groups }),
          { state: { isUpdated: true } }
        );
        void queryClient.invalidateQueries({
          queryKey: [DataQueryKeys.PERIODIC_ALARM_DETAILS],
        });
      },
      onError: (error: Error | { error: string; message: string }) => {
        console.error(
          '[UpdatePeriodicAlarm] save failed - localStorage NOT cleared'
        );
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
        shortName: values.shortName,
        clientUuid: values.clientUuid,
        measurementUuids: values.measurementUuids,
        configuration: {
          generationDay: values.generationDay ?? 1,
          generationTime: values.generationTime,
          delayInDays: values.delayInDays,
          comparisonMethod: values.comparisonMethod,
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
        dataRange: values.dataRange,
        sortOrder: values.sortOrder || MeasurementSortOrder.DEFAULT,
        sortDirection: values.sortDirection,
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

  const auditInfo = {
    author: alarmDetails?.data.auditInfo.authorEmail || '',
    createdAt: alarmDetails?.data.auditInfo.createdAt
      ? formatLocalDateTime(
          alarmDetails?.data.auditInfo.createdAt,
          'yyyy-MM-dd HH:mm'
        )
      : '',
    updatedBy: alarmDetails?.data.auditInfo.editorEmail,
    lastUpdatedAt:
      alarmDetails?.data.auditInfo.updatedAt &&
      formatLocalDateTime(
        alarmDetails?.data.auditInfo.updatedAt,
        'yyyy-MM-dd HH:mm'
      ),
  };

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
          client: {
            disabled: true,
          },
          favoriteMeter: {
            hidden: true,
          },
        }}
      >
        {!shouldShowForm ? (
          <div className="flex justify-center items-center h-64">
            <Loader color="var(--color-rhino-indigo-blue)" size={24} />
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={(e) => {
                void handleSubmit(onSubmit, (errors) => {
                  console.error(
                    '[UpdatePeriodicAlarm] validation failed:',
                    errors
                  );
                  onError(errors);
                })(e);
              }}
            >
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
                        hasCreatorAccess={alarmDetails?.data.hasCreatorAccess}
                        isUpdate
                      />
                      <AlarmCriteria
                        isReadOnly={isReadOnly}
                        resetThresholdValues={resetThresholdValues}
                      />
                      <MomentOfExecution isReadOnly={isReadOnly} />
                      <MeasurementSorting isReadOnly={isReadOnly} />
                      <RecipientDetails isReadOnly={isReadOnly} />
                      <AdvancedSettings isReadOnly={isReadOnly} />
                    </div>
                    <div>
                      <AuditInfoCard {...auditInfo} />
                    </div>
                  </div>
                </div>
              </div>
              <FormFooter
                isPending={isPending}
                initialMeasurements={draftMeasurements ?? initialMeasurements}
                rawMeasurements={initialMeasurements}
                isReadOnly={isReadOnly}
                preferLocalStorage={false}
                resetMeasurements={resetMeasurements}
                onReset={handleResetMeasurements}
                onMeasurementsChange={handleMeasurementsChange}
                onCancel={() => {
                  clear();
                  navigate(
                    paths.alarm.periodic.base +
                      getRibbonParams({ clients, locations, groups }),
                    { replace: false }
                  );
                }}
              />
            </form>
          </FormProvider>
        )}
      </MainLayout>
    </AccessAuthorizer>
  );
};

export default UpdatePeriodicAlarm;
