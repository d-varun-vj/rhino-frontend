import { Location } from '@rhino/apis';
import { useTranslation } from 'react-i18next';
import UuidCombobox from '../UuidCombobox';
import { FieldType } from '@rhino/utils';
import { FilterData } from '../../../context/userFilter/user-filter-context';

type LocationComboboxProps = {
  onSelect?: (
    type: FieldType,
    value: {
      name: string;
      uuid: string;
    } | null
  ) => void;
  locations?: Location[];
  disabled?: boolean;
  selectedLocation?: FilterData | null;
};

const LocationCombobox = ({
  onSelect,
  locations,
  disabled: disenabled,
  selectedLocation,
}: LocationComboboxProps) => {
  const { t } = useTranslation();

  return (
    <UuidCombobox
      options={[
        ...(locations?.map((location) => ({
          name: location.name,
          uuid: location.uuid,
        })) || []),
      ]}
      defaultPlaceholder={t('comboBox.locationNull')}
      disabled={disenabled ?? false}
      onSelect={(location) => {
        if (onSelect) onSelect(FieldType.LOCATION, location);
      }}
      selectedValue={selectedLocation ?? null}
    />
  );
};

export default LocationCombobox;
