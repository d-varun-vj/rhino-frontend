import { Location } from '@rhino/apis';
import { FieldType } from '@rhino/utils';
import { ignoreMultipleValue } from 'apps/webapp/src/helpers/topribbon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterData } from '../../../context/userFilter/user-filter-context';
import CompactMultiSelector from '../../common/comboboxes/CompactMultiSelector';
import CustomComboBox from '../../common/comboboxes/CustomComboBox';

type LocationComboboxProps = {
  onSelect?: (
    type: FieldType,
    values: Array<{
      name: string;
      uuid: string;
    }> | null
  ) => void;
  locations?: Location[];
  disabled?: boolean;
  selectedLocations?: FilterData[] | null;
  multiple?: boolean;
};

const LocationCombobox = ({
  onSelect,
  locations,
  disabled = false,
  selectedLocations,
  multiple,
}: LocationComboboxProps) => {
  const { t } = useTranslation('components');

  const optionsList = useMemo(() => {
    if (!locations?.length) return [];

    return [
      {
        name: multiple ? 'Select All' : 'Select',
        uuid: '',
      },
      ...locations.map((location) => ({
        name: location.name,
        uuid: location.uuid,
      })),
    ];
  }, [locations, multiple]);

  const selectedValues = useMemo(() => {
    return (
      selectedLocations?.map((loc) => ({
        name: loc.name,
        uuid: loc.uuid,
      })) ?? []
    );
  }, [selectedLocations]);

  const handleMultiSelectionChange = (
    items: Array<{ name: string; uuid: string }>
  ) => {
    if (!onSelect) return;
    onSelect(FieldType.LOCATION, items.length > 0 ? items : null);
  };

  const handleSingleSelection = (uuid: string | null) => {
    if (!onSelect) return;

    const selectedLocation = uuid
      ? locations?.find((location) => location.uuid === uuid)
      : null;

    onSelect(FieldType.LOCATION, selectedLocation ? [selectedLocation] : null);
  };

  const commonProps = {
    optionsList,
    placeholder: t('comboBox.locationNull'),
    disabled,
    'data-testid': 'ribbon-location-selector',
  };

  return multiple ? (
    <CompactMultiSelector
      {...commonProps}
      selectedValues={selectedValues}
      setSelectedValues={handleMultiSelectionChange}
    />
  ) : (
    <CustomComboBox
      {...commonProps}
      selectedValue={
        !ignoreMultipleValue(selectedLocations) && selectedLocations?.[0]
          ? selectedLocations?.[0]
          : null
      }
      setSelectedValue={handleSingleSelection}
    />
  );
};

export default LocationCombobox;
