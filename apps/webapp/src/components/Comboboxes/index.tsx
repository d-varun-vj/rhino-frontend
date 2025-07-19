import { useEffect, useMemo, useState } from 'react';
import {
  InputBase,
  Combobox,
  useCombobox,
  ComboboxProps,
  ScrollArea,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { CONSTANTS } from '../../constant';

interface ComboBoxProps extends ComboboxProps {
  optionsList: string[];
  selectedValue: string | null;
  setSelectedValue: (val: string) => void;
  placeholder: string;
}

const CustomComboBox = ({
  optionsList,
  selectedValue,
  setSelectedValue,
  placeholder,
}: ComboBoxProps) => {
  const { t } = useTranslation();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(selectedValue ?? '');
  }, [selectedValue]);

  const filteredOptions = useMemo(() => {
    const shouldFilterOptions = optionsList.every((item) => item !== search);
    return shouldFilterOptions
      ? optionsList.filter((item) =>
          item.toLowerCase().includes(search ? search.toLowerCase().trim() : '')
        )
      : optionsList;
  }, [optionsList, search]);

  const isActiveOption = (item: string) => {
    return (
      item === selectedValue ||
      (selectedValue === '' &&
        item.toLowerCase() === CONSTANTS.SELECT_ALL_OPTION)
    );
  };

  const options = filteredOptions.map((item) => (
    <Combobox.Option
      value={item}
      key={item}
      style={{
        backgroundColor: isActiveOption(item)
          ? 'var(--color-rhino-indigo-blue-highlight)'
          : '',
        color: isActiveOption(item) ? 'white' : '',
      }}
    >
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSelectedValue(val);
        setSearch(val);
        if (val.toLowerCase() == CONSTANTS.SELECT_ALL_OPTION) {
          setSearch('');
        }
        combobox.closeDropdown();
      }}
      styles={{
        option: {
          fontSize: 'var(--font-size-sm)',
          padding: '8px 14px 8px 10px',
        },
      }}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(selectedValue || '');
          }}
          placeholder={placeholder}
          value={search ?? ''}
          onChange={(event) => {
            if (!event.currentTarget.value) {
              setSelectedValue(CONSTANTS.SELECT_ALL_OPTION);
            }
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={200}>
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
