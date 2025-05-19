import { FilterData } from '../../../../context/useFilter';
import UuidCombobox from '../UuidCombobox';
import { Location } from '../LocationCombobox/api';
import { useTranslation } from 'react-i18next';
import { FieldType } from '../../TopRibbon';

const GroupCombobox = ({
  onSelect,
  locations,
  disabled: disenabled,
  selectedGroup,
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
  selectedGroup?: FilterData | null;
  selectedLocation?: FilterData | null;
}) => {
  const { t } = useTranslation();

  return (
    <UuidCombobox
      options={
        locations
          ? locations
              .filter((location) =>
                selectedLocation?.name
                  ? location.name === selectedLocation.name
                  : true
              )
              .map((location) => ({
                name: location.name,
                uuid: location.uuid,
                groups: location.groups ? location.groups : [],
              }))
          : []
      }
      defaultPlaceholder={t('comboBox.groupNull')}
      disenabled={disenabled ?? false}
      setReturnValue={(group) => {
        if (onSelect) onSelect(FieldType.GROUP, group);
      }}
      selectedValue={selectedGroup ?? null}
    />
  );
};

export default GroupCombobox;
