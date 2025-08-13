import { useGetLocations, useGetTenants } from '@rhino/apis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { shouldSharingFieldBeVisible } from 'apps/webapp/src/helpers/sharing';
import { useTranslation } from 'react-i18next';
import CheckBox from '../../common/input/Checkbox';
import message from '../../notifier';
import SharingLocationPanel from './SharingLocation';
import SharingTenantPanel from './SharingTenant';
import { SharingSectionProps } from './types';

const SharingSection = ({
  isReadOnly = false,
  label,
  mode = 'create',
  authorUuid,
}: SharingSectionProps) => {
  const { control, setValue, resetField, watch, clearErrors } =
    useFormContext();
  const { t } = useTranslation('common');
  const { user } = useUser();
  const { client } = useUserFilter();

  const prevClientRef = useRef(client);
  const initializedRef = useRef(false);
  const isUpdateMode = mode === 'update';

  const [allowReactiveEffects, setAllowReactiveEffects] =
    useState(!isUpdateMode);

  const isLocationSharingVisible = shouldSharingFieldBeVisible({
    sharingField: 'Location',
    userType: user?.userType ?? null,
    isUpdatePage: isUpdateMode,
    authorUuid: authorUuid,
  });

  const isTenantSharingVisible = shouldSharingFieldBeVisible({
    sharingField: 'Tenant',
    userType: user?.userType ?? null,
    isUpdatePage: isUpdateMode,
    authorUuid: authorUuid,
  });

  const shouldFieldBeDisabled = client === null;
  const showSharingSection = isLocationSharingVisible || isTenantSharingVisible;

  const shared = watch('shared') as boolean;

  const sharedLocations = watch('sharedLocations') as string[];
  const sharedTenants = watch('sharedTenants') as string[];

  const { data: locationsData, isLoading: locationsLoading } = useGetLocations({
    clientId: client ? client?.uuid : null,
    queryKey: [client?.uuid],
  });

  const { data: tenantData, isLoading: tenantsLoading } = useGetTenants({
    clientUuid: client?.uuid ?? null,
    queryKey: [client?.uuid],
  });

  const resetSharingFields = useCallback(() => {
    resetField('shared');
    resetField('readOnly');
    resetField('sharedLocations');
    resetField('sharedTenants');
  }, [resetField]);

  const clearSharedItems = useCallback(() => {
    resetField('sharedLocations');
    resetField('sharedTenants');
  }, [resetField]);

  useEffect(() => {
    if (!initializedRef.current) {
      if (isUpdateMode || (!locationsLoading && !tenantsLoading)) {
        initializedRef.current = true;
        prevClientRef.current = client;
      }
    }
  }, [isUpdateMode, locationsLoading, tenantsLoading, client]);

  useEffect(() => {
    if (
      isUpdateMode &&
      initializedRef.current &&
      locationsData &&
      tenantData &&
      setValue
    ) {
      if (sharedLocations?.length > 0) {
        const validLocations = sharedLocations.filter((uuid: string) =>
          locationsData.some((location) => location.uuid === uuid)
        );
        if (validLocations.length !== sharedLocations.length) {
          setValue('sharedLocations', validLocations as never);
        }
      }

      if (sharedTenants?.length > 0) {
        const validTenants = sharedTenants.filter((uuid: string) =>
          tenantData.data?.some((tenant) => tenant.uuid === uuid)
        );
        if (validTenants.length !== sharedTenants.length) {
          setValue('sharedTenants', validTenants as never);
        }
      }
    }
  }, [
    isUpdateMode,
    locationsData,
    tenantData,
    sharedLocations,
    sharedTenants,
    setValue,
  ]);

  useEffect(() => {
    if (isUpdateMode && initializedRef.current) {
      const timer = setTimeout(() => {
        setAllowReactiveEffects(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isUpdateMode]);

  useEffect(() => {
    const hasClientChanged = prevClientRef.current !== client;

    if (hasClientChanged && initializedRef.current) {
      if (!isUpdateMode) {
        resetSharingFields();
      }
      prevClientRef.current = client;
    }
  }, [client, resetSharingFields, isUpdateMode]);

  useEffect(() => {
    if (!shared && setValue && initializedRef.current && allowReactiveEffects) {
      setValue('readOnly', true as never);
      clearSharedItems();
    }
  }, [shared, setValue, clearSharedItems, allowReactiveEffects]);

  const getValidatedLocations = () => {
    if (!shared || shouldFieldBeDisabled) return [];
    if (!Array.isArray(sharedLocations)) return [];

    if (isUpdateMode && (!locationsData || locationsData.length === 0)) {
      return sharedLocations;
    }

    return sharedLocations.filter((uuid: string) =>
      locationsData?.some((location) => location.uuid === uuid)
    );
  };

  const getValidatedTenants = () => {
    if (!shared || shouldFieldBeDisabled) return [];
    if (!Array.isArray(sharedTenants)) return [];

    if (isUpdateMode && (!tenantData?.data || tenantData.data.length === 0)) {
      return sharedTenants;
    }

    return sharedTenants.filter((uuid: string) =>
      tenantData?.data?.some((tenant) => tenant.uuid === uuid)
    );
  };

  if (!showSharingSection) return null;

  return (
    <div className="flex gap-5 flex-col">
      <div className="flex gap-6">
        <Controller
          name={'shared'}
          control={control}
          render={({ field }) => (
            <CheckBox
              label={label}
              checked={field.value as boolean}
              disabled={isReadOnly}
              onChange={(e) => {
                const isChecked = e.currentTarget.checked;
                if (client === null) {
                  message.warn(t('toast.emptyClientWarning'));
                  return;
                }
                field.onChange(isChecked);
              }}
            />
          )}
        />
        <Controller
          name={'readOnly'}
          control={control}
          render={({ field }) => (
            <CheckBox
              label={t('sharedSection.readOnly', { ns: 'components' })}
              checked={field.value as boolean}
              disabled={!shared || isReadOnly}
              onChange={(e) => field.onChange(e.currentTarget.checked)}
            />
          )}
        />
      </div>

      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        {isLocationSharingVisible && (
          <Controller
            name={'sharedLocations'}
            control={control}
            render={({ field, fieldState }) => (
              <SharingLocationPanel
                value={getValidatedLocations()}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors('sharedTenants');
                }}
                clearable
                disabled={!shared || shouldFieldBeDisabled || isReadOnly}
                error={fieldState.error?.message}
              />
            )}
          />
        )}
        {isTenantSharingVisible && (
          <Controller
            name={'sharedTenants'}
            control={control}
            render={({ field, fieldState }) => (
              <SharingTenantPanel
                value={getValidatedTenants()}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors('sharedLocations');
                }}
                clearable
                disabled={!shared || shouldFieldBeDisabled || isReadOnly}
                error={fieldState.error?.message}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SharingSection;
