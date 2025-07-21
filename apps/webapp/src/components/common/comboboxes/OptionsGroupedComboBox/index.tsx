import { useEffect, useMemo, useState } from 'react';
import {
  InputBase,
  Combobox,
  useCombobox,
  ComboboxProps,
  ScrollArea,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { CONSTANTS } from 'apps/webapp/src/constant';

interface OptionsGroupedComboBox extends ComboboxProps {
  optionsList: {
    label: string;
    options: { name: string; uuid?: string }[];
  }[];
  selectedValue: {
    name: string;
    uuid?: string;
  } | null;
  setSelectedValue: (value: string | null) => void;
  placeholder: string;
  disabled?: boolean;
}

const OptionsGroupedComboBox = ({
  optionsList,
  selectedValue,
  setSelectedValue,
  placeholder,
  disabled,
  ...props
}: OptionsGroupedComboBox) => {
  const { t } = useTranslation();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(selectedValue?.name ?? '');
  }, [selectedValue]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) {
      return optionsList;
    }

    const shouldFilterOptions = optionsList.every((group) =>
      group.options.every((option) => option.name !== search)
    );

    if (!shouldFilterOptions) {
      return optionsList;
    }

    const searchTerm = search.toLowerCase().trim();

    return optionsList
      .map((group) => {
        const filteredGroupOptions = group.options.filter((option) =>
          option.name.toLowerCase().includes(searchTerm)
        );

        const groupMatches = group.label.toLowerCase().includes(searchTerm);

        return {
          ...group,
          options: groupMatches ? group.options : filteredGroupOptions,
        };
      })
      .filter(
        (group) =>
          group.label.toLowerCase().includes(searchTerm) ||
          group.options.length > 0
      );
  }, [optionsList, search]);

  const isActiveOption = (option: { name: string; uuid?: string }) => {
    const isDefaultSelect =
      search === '' && option.name.toLowerCase() === CONSTANTS.SELECT.DEFAULT;

    if (selectedValue?.uuid && option.uuid) {
      return selectedValue.uuid === option.uuid || isDefaultSelect;
    }
    return (
      selectedValue?.name.toLowerCase() === option.name.toLowerCase() ||
      isDefaultSelect
    );
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        let selectedOption = null;
        for (const group of optionsList) {
          const found = group.options.find((option) =>
            option.uuid ? option.uuid === val : option.name === val
          );
          if (found) {
            selectedOption = found;
            break;
          }
        }

        if (selectedOption) {
          setSelectedValue(val);
          setSearch(selectedOption.name);

          if (
            selectedOption.name.toLowerCase() ===
            CONSTANTS.SELECT?.DEFAULT?.toLowerCase()
          ) {
            setSearch('');
            setSelectedValue(null);
          }
        }

        combobox.closeDropdown();
      }}
      styles={{
        option: {
          fontSize: 'var(--font-size-sm)',
          padding: '8px 14px 8px 10px',
        },
      }}
      disabled={disabled}
      {...props}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(selectedValue?.name || '');
          }}
          placeholder={placeholder}
          value={search}
          onChange={(event) => {
            const inputValue = event.currentTarget.value;

            if (!inputValue.trim()) {
              setSelectedValue(null);
            }

            combobox.updateSelectedOptionIndex();
            setSearch(inputValue);
          }}
          disabled={disabled}
        />
      </Combobox.Target>

      <Combobox.Dropdown
        style={{
          borderColor: 'var(--color-rhino-indigo-blue-highlight)',
          padding: '8px 10px',
        }}
      >
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={250}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((group) => (
                <Combobox.Group label={group.label} key={group.label}>
                  {group.options.map((option) => (
                    <Combobox.Option
                      value={option.uuid ? option.uuid : option.name}
                      key={option.uuid ? option.uuid : option.name}
                      style={{
                        backgroundColor: isActiveOption(option)
                          ? 'var(--color-rhino-indigo-blue-highlight)'
                          : '',
                        color: isActiveOption(option) ? 'white' : '',
                        borderRadius: 0,
                      }}
                    >
                      {option.name}
                    </Combobox.Option>
                  ))}
                </Combobox.Group>
              ))
            ) : (
              <Combobox.Empty
                style={{
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                {t('comboBox.empty')}
              </Combobox.Empty>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default OptionsGroupedComboBox;
