import { useGetTenants } from '@rhino/apis';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { useTranslation } from 'react-i18next';
import MultiSelectComboBox, {
  MultiSelectComboBoxProps,
} from '../../../common/comboboxes/MultiSelectComboBox';

const SharingTenantPanel = ({
  disabled,
  ...props
}: MultiSelectComboBoxProps) => {
  const { t } = useTranslation('components');
  const { client } = useUserFilter();

  const { data: tenantData } = useGetTenants({
    clientUuid: client?.uuid ?? null,
    queryKey: [client?.uuid],
  });

  return (
    <MultiSelectComboBox
      label={t('sharedSection.sharedTenants')}
      data={
        tenantData?.data
          ?.map((tenant) => ({
            label: tenant.displayNameWithLeaseNumber,
            value: tenant.uuid,
          }))
          .sort((a, b) => a.label.localeCompare(b.label)) || []
      }
      disabled={tenantData?.data?.length === 0 || disabled}
      {...props}
    />
  );
};

export default SharingTenantPanel;
