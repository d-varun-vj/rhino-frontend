import {
  Combobox,
  ComboboxProps,
  Divider,
  Group,
  Pill,
  PillsInput,
  ScrollArea,
  useCombobox,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Item } from '../types';

interface CompactOptionsGroupedComboBoxProps extends ComboboxProps {
  optionsList: {
    label: string;
    options: Item[];
  }[];
  selectedValues: Item[];
  setSelectedValues: (values: Item[]) => void;
  placeholder: string;
  disabled?: boolean;
  maxDisplayedValues?: number;
  label?: string;
  error?: string;
  required?: boolean;
}

const CompactOptionsGroupedMultiSelector = ({
  optionsList,
  selectedValues = [],
  setSelectedValues,
  placeholder,
  disabled,
  maxDisplayedValues = 1,
  label,
  error,
  required,
  ...props
}: CompactOptionsGroupedComboBoxProps) => {
  const { t } = useTranslation('components');

  const [search, setSearch] = useState('');

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch('');
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const allRegularOptions = useMemo(() => {
    return optionsList.flatMap((group) =>
      group.options.filter((option) => option.uuid !== '')
    );
  }, [optionsList]);

  const allSelected = useMemo(() => {
    return (
      allRegularOptions.length > 0 &&
      selectedValues.length === allRegularOptions.length
    );
  }, [allRegularOptions, selectedValues]);

  const hasSelectAllOption = useMemo(() => {
    return optionsList.some((group) =>
      group.options.some((option) => option.uuid === '')
    );
  }, [optionsList]);

  const handleValueSelect = (val: string) => {
    if (val === '') {
      if (allSelected) {
        setSelectedValues([]);
      } else {
        setSelectedValues(allRegularOptions);
      }
      return;
    }

    let selectedOption: Item | null = null;

    for (const group of optionsList) {
      const found = group.options.find((option) =>
        option.uuid ? option.uuid === val : option.name === val
      );
      if (found) {
        selectedOption = found;
        break;
      }
    }

    if (!selectedOption) return;

    const exists = selectedValues.some((v) =>
      v.uuid && selectedOption.uuid
        ? v.uuid === selectedOption.uuid
        : v.name === selectedOption.name
    );

    const newValues = exists
      ? selectedValues.filter((v) =>
          v.uuid && selectedOption.uuid
            ? v.uuid !== selectedOption.uuid
            : v.name !== selectedOption.name
        )
      : [...selectedValues, selectedOption];

    setSelectedValues(newValues);
  };

  const handleValueRemove = (item: { name: string; uuid?: string }) => {
    setSelectedValues(
      selectedValues.filter((v) =>
        v.uuid && item.uuid ? v.uuid !== item.uuid : v.name !== item.name
      )
    );
  };

  const filteredOptions = useMemo(() => {
    const q = search.toLowerCase().trim();

    const selectedSet = new Set(selectedValues.map((v) => v.uuid || v.name));

    return optionsList
      .map((group) => {
        const groupMatches = !q || group.label.toLowerCase().includes(q);

        const filteredOptions = group.options.filter((option) => {
          if (option.uuid === '') return false;

          const nameMatches = !q || option.name.toLowerCase().includes(q);
          return groupMatches || nameMatches;
        });

        const selected = filteredOptions.filter((o) =>
          selectedSet.has(o.uuid || o.name)
        );
        const unselected = filteredOptions.filter(
          (o) => !selectedSet.has(o.uuid || o.name)
        );

        return {
          label: group.label,
          selectedOptions: selected,
          unselectedOptions: unselected,
        };
      })
      .filter(
        (group) =>
          group.selectedOptions.length > 0 || group.unselectedOptions.length > 0
      );
  }, [optionsList, selectedValues, search]);

  const visibleValues = selectedValues.slice(0, maxDisplayedValues);
  const remainingCount = selectedValues.length - maxDisplayedValues;

  const pills = visibleValues.map((item) => (
    <Pill
      key={item.uuid || item.name}
      withRemoveButton
      onRemove={() => handleValueRemove(item)}
      styles={{
        root: {
          maxWidth: 180,
          borderRadius: 4,
        },
      }}
    >
      {item.name}
    </Pill>
  ));

  if (remainingCount > 0) {
    pills.push(
      <Pill
        key="more"
        styles={{
          root: {
            borderRadius: 4,
          },
        }}
      >
        +{remainingCount}
      </Pill>
    );
  }

  const options = (
    <>
      {hasSelectAllOption && (
        <>
          <Combobox.Option
            value=""
            style={{
              borderRadius: 0,
              fontSize: 13,
            }}
          >
            <Group gap="sm">
              <span>
                {allSelected
                  ? t('comboBox.deselectAll')
                  : t('comboBox.selectAll')}
              </span>
            </Group>
          </Combobox.Option>
          <Divider />
        </>
      )}

      {filteredOptions.map((group) => (
        <Combobox.Group label={group.label} key={group.label}>
          {group.selectedOptions.map((item) => (
            <Combobox.Option
              key={item.uuid || item.name}
              value={item.uuid || item.name}
              style={{
                backgroundColor: 'var(--color-rhino-indigo-blue-highlight)',
                color: 'white',
                borderRadius: 0,
                fontSize: 13,
              }}
            >
              <Group gap="sm">
                <span>{item.name}</span>
              </Group>
            </Combobox.Option>
          ))}

          {group.selectedOptions.length > 0 &&
            group.unselectedOptions.length > 0 && <Divider />}

          {group.unselectedOptions.map((item) => (
            <Combobox.Option
              key={item.uuid || item.name}
              value={item.uuid || item.name}
              style={{
                fontSize: 13,
              }}
            >
              <Group gap="sm">
                <span>{item.name}</span>
              </Group>
            </Combobox.Option>
          ))}
        </Combobox.Group>
      ))}

      {filteredOptions.length === 0 && (
        <Combobox.Empty>{t('comboBox.empty')}</Combobox.Empty>
      )}
    </>
  );

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      disabled={disabled}
      {...props}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          rightSection={<Combobox.Chevron />}
          onClick={() => !disabled && combobox.openDropdown()}
          pointer
          disabled={disabled}
          error={!!error}
          label={label}
          required={required}
          styles={{
            input: {
              maxWidth: 250,
              minWidth: 250,
              flexWrap: 'nowrap',
              overflowX: 'hidden',
              border: combobox.dropdownOpened
                ? '1px solid var(--color-rhino-indigo-blue-light)'
                : disabled
                  ? '1px solid #babbbb'
                  : '1px solid var(--border-color)',
            },
          }}
        >
          <Pill.Group
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: 4,
            }}
          >
            {pills.length > 0 ? (
              pills
            ) : (
              <span className="text-sm text-rhino-grey/50 pt-0.5">
                {placeholder}
              </span>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown
        style={{
          borderColor: 'var(--color-rhino-indigo-blue-highlight)',
          padding: '8px 10px',
        }}
      >
        <Combobox.Search
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          styles={{
            input: {
              borderRadius: 4,
              border: '1px solid var(--color-rhino-indigo-blue-light)',
            },
          }}
        />

        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={250}>
            {options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default CompactOptionsGroupedMultiSelector;
