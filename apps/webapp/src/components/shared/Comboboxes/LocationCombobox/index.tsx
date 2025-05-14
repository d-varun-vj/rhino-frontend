import { FilterData } from '../../../../context/useFilter';
import UuidCombobox from '../UuidCombobox';
import { Location } from './api';
import { useTranslation } from 'react-i18next';
import { FieldType } from '../../TopRibbon';

const LocationCombobox = ({
  onSelect,
  locations,
  disabled: disenabled,
  selectedLocation,
}: {
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
}) => {
  const { t } = useTranslation();

  return (
    <UuidCombobox
      options={
        locations
          ? locations?.map((location) => ({
              name: location.name,
              uuid: location.uuid,
            }))
          : []
      }
      defaultPlaceholder={t('comboBox.locationNull')}
      disenabled={disenabled ?? false}
      setReturnValue={(location) => {
        if (onSelect) onSelect(FieldType.LOCATION, location);
      }}
      selectedValue={selectedLocation ?? null}
    />
  );
};

export default LocationCombobox;
