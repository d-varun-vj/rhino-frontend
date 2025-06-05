import { useTranslation } from 'react-i18next';
import UuidCombobox from '../UuidCombobox';
import { FieldType } from '@rhino/utils';
import { FilterData } from '../../../context/userFilter/user-filter-context';
import { Location } from '@rhino/apis';

type GroupComboboxProps = {
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
};

const GroupCombobox = ({
  onSelect,
  locations,
  disabled: disenabled,
  selectedGroup,
  selectedLocation,
}: GroupComboboxProps) => {
  const { t } = useTranslation();

  return (
    <UuidCombobox
      options={[
        ...(locations
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
          : []),
      ]}
      defaultPlaceholder={t('comboBox.groupNull')}
      disabled={disenabled ?? false}
      onSelect={(group) => {
        if (onSelect) onSelect(FieldType.GROUP, group);
      }}
      selectedValue={selectedGroup ?? null}
    />
  );
};

export default GroupCombobox;
