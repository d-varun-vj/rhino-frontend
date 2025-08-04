import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { shouldSharingFieldBeVisible } from 'apps/webapp/src/helpers/sharing';
import { useEffect } from 'react';
import { Controller, FieldValues, Path, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CheckBox from '../../common/input/Checkbox';
import message from '../../notifier';
import SharingLocationPanel from './SharingLocation';
import SharingTenantPanel from './SharingTenant';
import { SharingSectionProps } from './types';

const SharingSection = <T extends FieldValues>({
  control,
  error,
}: SharingSectionProps<T>) => {
  const { t } = useTranslation('common');
  const { user } = useUser();
  const { client } = useUserFilter();

  const isLocationSharingVisible = shouldSharingFieldBeVisible({
    sharingField: 'Location',
    userType: user?.userType ?? null,
  });

  const isTenantSharingVisible = shouldSharingFieldBeVisible({
    sharingField: 'Tenant',
    userType: user?.userType ?? null,
  });

  const shouldFieldBeDisabled = client === null;
  const showSharingSection = isLocationSharingVisible || isTenantSharingVisible;

  const shared = useWatch({ control, name: 'shared' as Path<T> });

  useEffect(() => {
    // Optionally reset form values when client changes
    // You could also use reset() here if needed
  }, [client]);

  if (!showSharingSection) return null;

  return (
    <div className="flex gap-5 flex-col">
      <div className="flex gap-6">
        <Controller
          name={'shared' as Path<T>}
          control={control}
          render={({ field }) => (
            <CheckBox
              label={t('shared')}
              checked={field.value}
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
          name={'readOnly' as Path<T>}
          control={control}
          render={({ field }) => (
            <CheckBox
              label={t('sharedSection.readOnly', { ns: 'components' })}
              checked={field.value}
              disabled={!shared}
              onChange={(e) => field.onChange(e.currentTarget.checked)}
            />
          )}
        />
      </div>

      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        {isLocationSharingVisible && (
          <Controller
            name={'sharedLocations' as Path<T>}
            control={control}
            render={({ field }) => (
              <SharingLocationPanel
                value={shared && !shouldFieldBeDisabled ? field.value : []}
                onChange={field.onChange}
                clearable
                disabled={!shared || shouldFieldBeDisabled}
                error={error}
              />
            )}
          />
        )}
        {isTenantSharingVisible && (
          <Controller
            name={'sharedTenants' as Path<T>}
            control={control}
            render={({ field }) => (
              <SharingTenantPanel
                value={shared && !shouldFieldBeDisabled ? field.value : []}
                onChange={field.onChange}
                clearable
                disabled={!shared || shouldFieldBeDisabled}
                error={error}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SharingSection;
