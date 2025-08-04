import {
  Combobox,
  ComboboxProps,
  InputBase,
  ScrollArea,
  useCombobox,
} from '@mantine/core';
import { CONSTANTS } from 'apps/webapp/src/constant';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CustomComboBox extends ComboboxProps {
  optionsList: {
    name: string;
    uuid?: string;
  }[];
  selectedValue: {
    name: string;
    uuid?: string;
  } | null;
  setSelectedValue: (val: string | null) => void;
  placeholder: string;
  disabled?: boolean;
}

const CustomComboBox = ({
  optionsList,
  selectedValue,
  setSelectedValue,
  placeholder,
  disabled,
  ...props
}: CustomComboBox) => {
  const { t } = useTranslation('components');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(selectedValue?.name ?? '');
  }, [selectedValue]);

  const filteredOptions = useMemo(() => {
    const shouldFilterOptions = optionsList.every(
      (item) => item.name !== search
    );
    return shouldFilterOptions
      ? optionsList.filter((item) =>
          item.name
            .toLowerCase()
            .includes(search ? search.toLowerCase().trim() : '')
        )
      : optionsList;
  }, [optionsList, search]);

  const isActiveOption = (item: string) => {
    return (
      item.toLowerCase() === selectedValue?.name.toLowerCase() ||
      (search === '' && item.toLowerCase() === CONSTANTS.SELECT.DEFAULT)
    );
  };

  const options = filteredOptions.map((item) => (
    <Combobox.Option
      value={item.uuid ? item.uuid : item.name}
      key={item.uuid ? item.uuid : item.name}
      style={{
        backgroundColor: isActiveOption(item.name)
          ? 'var(--color-rhino-indigo-blue-highlight)'
          : '',
        color: isActiveOption(item.name) ? 'white' : '',
        borderRadius: 0,
      }}
    >
      {item.name}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        const selectedOption = optionsList.find((option) =>
          option.uuid ? option.uuid === val : option.name === val
        );

        if (selectedOption) {
          setSelectedValue(
            selectedOption.uuid ? selectedOption.uuid : selectedOption.name
          );
          setSearch(selectedOption.name);
          if (selectedOption.name.toLowerCase() === CONSTANTS.SELECT.DEFAULT) {
            setSearch('');
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
            if (!event.currentTarget.value) {
              setSelectedValue(null);
            }
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
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
            {options.length > 0 ? (
              options
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

export default CustomComboBox;
