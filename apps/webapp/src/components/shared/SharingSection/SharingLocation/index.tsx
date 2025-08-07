import { useGetLocations } from '@rhino/apis';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { useTranslation } from 'react-i18next';
import MultiSelectComboBox, {
  MultiSelectComboBoxProps,
} from '../../../common/comboboxes/MultiSelectComboBox';

const SharingLocationPanel = ({
  disabled,
  ...props
}: MultiSelectComboBoxProps) => {
  const { t } = useTranslation('components');
  const { client } = useUserFilter();

  const { data: locationsData } = useGetLocations({
    clientId: client ? client?.uuid : null,
    queryKey: [client?.uuid],
  });

  return (
    <MultiSelectComboBox
      label={t('sharedSection.sharedLocations')}
      data={
        locationsData
          ?.map((location) => ({
            label: location.name,
            value: location.uuid,
          }))
          .sort((a, b) => a.label.localeCompare(b.label)) || []
      }
      disabled={locationsData?.length === 0 || disabled}
      {...props}
    />
  );
};

export default SharingLocationPanel;
