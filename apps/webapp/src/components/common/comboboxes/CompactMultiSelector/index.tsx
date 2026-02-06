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

interface CompactMultiSelectorProps extends ComboboxProps {
  optionsList: Item[];
  selectedValues: Item[];
  setSelectedValues: (val: Item[]) => void;
  placeholder: string;
  disabled?: boolean;
  maxDisplayedValues?: number;
  label?: string;
  error?: string;
  required?: boolean;
}

const CompactMultiSelector = ({
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
}: CompactMultiSelectorProps) => {
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

  const selectAllOption = optionsList.find((item) => item.uuid === '');
  const regularOptions = optionsList.filter((item) => item.uuid !== '');

  const allSelected =
    regularOptions.length > 0 &&
    selectedValues.length === regularOptions.length;

  const handleValueSelect = (val: string) => {
    if (val === '') {
      if (allSelected) {
        setSelectedValues([]);
      } else {
        setSelectedValues(regularOptions);
      }
      return;
    }

    const selectedOption = regularOptions.find((o) => o.uuid === val);
    if (!selectedOption) return;

    const exists = selectedValues.some((v) => v.uuid === val);

    const newValues = exists
      ? selectedValues.filter((v) => v.uuid !== val)
      : [...selectedValues, selectedOption];

    setSelectedValues(newValues);
  };

  const handleValueRemove = (item: Item) => {
    setSelectedValues(selectedValues.filter((v) => v.uuid !== item.uuid));
  };

  const filteredOptions = useMemo(() => {
    const q = search.toLowerCase().trim();
    const matches = (i: Item) => !q || i.name.toLowerCase().includes(q);

    const selectedSet = new Set(selectedValues.map((v) => v.uuid));

    return {
      selectedOptions: regularOptions.filter(
        (o) => selectedSet.has(o.uuid) && matches(o)
      ),
      unselectedOptions: regularOptions.filter(
        (o) => !selectedSet.has(o.uuid) && matches(o)
      ),
    };
  }, [regularOptions, selectedValues, search]);

  const visibleValues = selectedValues.slice(0, maxDisplayedValues);
  const remainingCount = selectedValues.length - maxDisplayedValues;

  const pills = visibleValues.map((item) => (
    <Pill
      key={item.uuid}
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
      {selectAllOption && (
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
                {allSelected ? t('comboBox.deselectAll') : selectAllOption.name}
              </span>
            </Group>
          </Combobox.Option>
          <Divider />
        </>
      )}

      {filteredOptions.selectedOptions.map((item) => (
        <Combobox.Option
          key={item.uuid}
          value={item.uuid}
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

      {filteredOptions.selectedOptions.length > 0 &&
        filteredOptions.unselectedOptions.length > 0 && <Divider />}

      {filteredOptions.unselectedOptions.map((item) => (
        <Combobox.Option
          key={item.uuid}
          value={item.uuid}
          style={{ fontSize: 13 }}
        >
          <Group gap="sm">
            <span>{item.name}</span>
          </Group>
        </Combobox.Option>
      ))}

      {filteredOptions.selectedOptions.length === 0 &&
        filteredOptions.unselectedOptions.length === 0 && (
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
              <span className="text-sm text-rhino-grey/50  pt-0.5">
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

export default CompactMultiSelector;
