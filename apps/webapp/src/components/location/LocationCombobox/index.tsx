import { Location } from '@rhino/apis';
import { FieldType } from '@rhino/utils';
import { useTranslation } from 'react-i18next';
import { FilterData } from '../../../context/userFilter/user-filter-context';
import CustomComboBox from '../../common/comboboxes/CustomComboBox';

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
  const { t } = useTranslation('components');

  return (
    <CustomComboBox
      optionsList={
        locations?.length
          ? [
              {
                name: 'Select',
                uuid: '',
              },
              ...(locations?.map((location) => ({
                name: location.name,
                uuid: location.uuid,
              })) || []),
            ]
          : []
      }
      placeholder={t('comboBox.locationNull')}
      selectedValue={selectedLocation ?? null}
      setSelectedValue={(uuid) => {
        if (onSelect) {
          const selectedLocation = uuid
            ? locations?.find((location) => location.uuid === uuid)
            : null;
          onSelect(FieldType.LOCATION, selectedLocation ?? null);
        }
      }}
      disabled={disenabled ?? false}
    />
  );
};

export default LocationCombobox;
