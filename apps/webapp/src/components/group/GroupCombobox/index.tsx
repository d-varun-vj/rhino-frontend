import { useTranslation } from 'react-i18next';
import { FieldType } from '@rhino/utils';
import { FilterData } from '../../../context/userFilter/user-filter-context';
import { Location } from '@rhino/apis';
import OptionsGroupedComboBox from '../../common/comboboxes/OptionsGroupedComboBox';

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
    <OptionsGroupedComboBox
      optionsList={[
        {
          label: '',
          options: [
            {
              name: 'Select',
              uuid: '',
            },
          ],
        },
        ...(locations
          ? locations
              .filter((location) =>
                selectedLocation?.name
                  ? location.name === selectedLocation.name
                  : true
              )
              .map((location) => ({
                label: location.name,
                options: location.groups ? location.groups : [],
              }))
          : []),
      ]}
      placeholder={t('comboBox.groupNull')}
      selectedValue={selectedGroup ?? null}
      setSelectedValue={(uuid) => {
        if (onSelect) {
          if (!uuid) {
            onSelect(FieldType.GROUP, null);
            return;
          }

          let selectedGroup = null;

          for (const location of locations || []) {
            if (location.groups) {
              const foundGroup = location.groups.find(
                (group) => group.uuid === uuid
              );
              if (foundGroup) {
                selectedGroup = foundGroup;
                break;
              }
            }
          }

          onSelect(FieldType.GROUP, selectedGroup);
        }
      }}
      disabled={disenabled ?? false}
    />
  );
};

export default GroupCombobox;
