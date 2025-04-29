import React, { useEffect, useState } from 'react';
import './RIbbonComboBox.css';

interface ComboBoxProps {
  options: {
    name: string;
    uuid: string;
    groups?: { name: string; uuid: string }[];
  }[];
  defaultPlaceholder: string;
  disabled: boolean;
  setReturnValue: (data: { name: string; uuid: string } | null) => void;
  selectedValue: {
    name: string;
    uuid: string;
  } | null;
}
const RibbonComboBox = ({
  options,
  defaultPlaceholder,
  disabled,
  setReturnValue,
  selectedValue,
}: ComboBoxProps) => {
  const [search, setSearch] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<{
    name: string;
    uuid: string;
  } | null>({
    name: selectedValue ? selectedValue.name : defaultPlaceholder,
    uuid: selectedValue ? selectedValue.uuid : '',
  });

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search ? search.toLowerCase() : '')
  );
  const GroupfilteredOptions = options.map((option) =>
    option.groups?.filter((group) =>
      group.name.toLowerCase().includes(search ? search.toLowerCase() : '')
    )
  );

  const handleSelect = (option: { name: string; uuid: string }) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    setSearch(null);
  };

  useEffect(() => {
    setReturnValue(
      selectedOption?.name === defaultPlaceholder ? null : selectedOption
    );
  }, [defaultPlaceholder, selectedOption, setReturnValue]);

  return (
    <div
      className="custom-select-wrapper"
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div
        className={`${isDropdownOpen ? '!border-rhino-indigo-blue !border-b-transparent custom-select-header' : 'custom-select-header'} ${disabled ? '!bg-[#eee]' : ''} focus-within:rounded-bl-none focus-within:rounded-br-none `}
        onClick={() =>
          disabled
            ? setIsDropdownOpen(false)
            : setIsDropdownOpen(!isDropdownOpen)
        }
        tabIndex={0}
      >
        <span>{selectedValue?.name || defaultPlaceholder}</span>
        {/* Add custom down icon */}
        <span className="custom-icon">▼</span>
      </div>

      {isDropdownOpen && (
        <div className="custom-select-dropdown">
          <input
            type="text"
            placeholder="Search..."
            value={search ? search : ''}
            onChange={(e) => setSearch(e.target.value)}
            className="custom-select-search"
          />
          <ul className="custom-select-options">
            {search === '' &&
            defaultPlaceholder &&
            filteredOptions.length !== 0 ? (
              <li
                onClick={() =>
                  handleSelect({
                    name: defaultPlaceholder,
                    uuid: 'placeholder',
                  })
                }
                className={`${defaultPlaceholder == selectedOption?.name ? 'bg-[#036983] text-white custom-select-option' : 'custom-select-option'} `}
              >
                {defaultPlaceholder}
              </li>
            ) : null}

            {filteredOptions.map((option, index) =>
              option.groups ? (
                <React.Fragment key={index}>
                  <p className="text-sm py-4 text-gray-500">{option.name}</p>
                  {option.groups.map((group, index) => (
                    <li
                      key={`${index}-${group.name}`}
                      onClick={() =>
                        handleSelect({
                          name: group.name,
                          uuid: group.uuid,
                        })
                      }
                      className={`${group.name == selectedOption?.name ? 'bg-[#036983] text-white custom-select-option' : 'custom-select-option'} `}
                    >
                      {group.name}
                    </li>
                  ))}
                </React.Fragment>
              ) : (
                <li
                  key={index}
                  onClick={() =>
                    handleSelect({
                      name: option.name || defaultPlaceholder,
                      uuid: option.uuid,
                    })
                  }
                  className={`${option.name == selectedOption?.name ? 'bg-[#036983] text-white custom-select-option' : 'custom-select-option'} `}
                >
                  {option.name}
                </li>
              )
            )}
            {GroupfilteredOptions.map((filterGroups, index) => (
              <React.Fragment key={index}>
                {filterGroups?.map((group, index) => (
                  <li
                    key={`${index}-${group.name}`}
                    onClick={() =>
                      handleSelect({
                        name: group.name,
                        uuid: group.uuid,
                      })
                    }
                    className={`${group.name == selectedOption?.name ? 'bg-[#036983] text-white custom-select-option' : 'custom-select-option'} `}
                  >
                    {group.name}
                  </li>
                ))}
              </React.Fragment>
            ))}
            {filteredOptions.length === 0 && (
              <li className="text-[13px] text-rhino-indigo-blue text-center">
                No options found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RibbonComboBox;
