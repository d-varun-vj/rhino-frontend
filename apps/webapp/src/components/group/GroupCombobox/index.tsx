import { Location } from '@rhino/apis';
import { FieldType } from '@rhino/utils';
import { ignoreMultipleValue } from 'apps/webapp/src/helpers/topribbon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterData } from '../../../context/userFilter/user-filter-context';
import CompactOptionsGroupedMultiSelector from '../../common/comboboxes/CompactOptionsGroupedMultiSelector';
import OptionsGroupedComboBox from '../../common/comboboxes/OptionsGroupedComboBox';

type GroupComboboxProps = {
  onSelect?: (
    type: FieldType,
    values: Array<{
      name: string;
      uuid: string;
    }> | null
  ) => void;
  locations?: Location[];
  disabled?: boolean;
  selectedGroups?: FilterData[] | null;
  selectedLocations?: FilterData[] | null;
  multiple?: boolean;
};

const GroupCombobox = ({
  onSelect,
  locations,
  disabled = false,
  selectedGroups,
  selectedLocations,
  multiple,
}: GroupComboboxProps) => {
  const { t } = useTranslation('components');

  const optionsList = useMemo(() => {
    if (!locations?.length) return [];

    const filteredLocations = locations.filter((location) =>
      selectedLocations?.length
        ? selectedLocations.some(
            (selectedLoc) => selectedLoc.name === location.name
          )
        : true
    );

    return [
      {
        label: '',
        options: [
          {
            name: multiple ? t('comboBox.selectAll') : 'Select',
            uuid: '',
          },
        ],
      },
      ...filteredLocations.map((location) => ({
        label: location.name,
        options: location.groups ?? [],
      })),
    ];
  }, [locations, selectedLocations, multiple, t]);

  const handleSelectionChange = (
    items: Array<{ name: string; uuid: string }> | null
  ) => {
    if (!onSelect) return;
    onSelect(FieldType.GROUP, items && items.length > 0 ? items : null);
  };

  const handleSingleSelection = (uuid: string | null) => {
    if (!onSelect) return;

    if (!uuid) {
      onSelect(FieldType.GROUP, null);
      return;
    }

    const selectedGroup = locations
      ?.flatMap((location) => location.groups ?? [])
      .find((group) => group.uuid === uuid);

    onSelect(FieldType.GROUP, selectedGroup ? [selectedGroup] : null);
  };

  const commonProps = {
    optionsList,
    placeholder: t('comboBox.groupNull'),
    disabled,
    'data-testid': 'ribbon-group-selector',
  };

  return multiple ? (
    <CompactOptionsGroupedMultiSelector
      {...commonProps}
      selectedValues={selectedGroups ?? []}
      setSelectedValues={handleSelectionChange}
    />
  ) : (
    <OptionsGroupedComboBox
      {...commonProps}
      selectedValue={
        !ignoreMultipleValue(selectedLocations) && selectedGroups?.[0]
          ? selectedGroups?.[0]
          : null
      }
      setSelectedValue={handleSingleSelection}
    />
  );
};

export default GroupCombobox;
