import { useState } from 'react';
import {
  InputBase,
  Combobox,
  useCombobox,
  ComboboxProps,
  ScrollArea,
} from '@mantine/core';
import { t } from 'i18next';

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
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState(selectedValue);

  const shouldFilterOptions = optionsList.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? optionsList.filter((item) =>
        item.toLowerCase().includes(search ? search.toLowerCase().trim() : '')
      )
    : optionsList;

  const options = filteredOptions.map((item) => (
    <Combobox.Option
      value={item}
      key={item}
      style={{
        backgroundColor: item == selectedValue ? '#036983' : '',
        color: item == selectedValue ? 'white' : '',
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
        if (val.toLowerCase() == 'all') {
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
              setSelectedValue('all');
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
