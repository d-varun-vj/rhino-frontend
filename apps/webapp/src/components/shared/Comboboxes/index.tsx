import { useEffect, useState } from 'react';
import './ComboBox.css';

interface ComboBoxProps {
  options: string[];
  defaultPlaceholder: string;
  disabled: boolean;
  setReturnValue: (data: string | null) => void;
  selectedValue: string | null;
  customStyle?: { header: string; dropdown: string };
}
const ComboBox = ({
  options,
  defaultPlaceholder,
  disabled,
  setReturnValue,
  selectedValue,
  customStyle,
}: ComboBoxProps) => {
  const [search, setSearch] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedValue ? selectedValue : defaultPlaceholder
  );

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search ? search.toLowerCase() : '')
  );

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    setSearch(null);
  };

  useEffect(() => {
    setReturnValue(
      selectedOption === defaultPlaceholder ? 'all' : selectedOption
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <div
      className="select-wrapper"
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div
        className={`${isDropdownOpen ? '!border-rhino-indigo-blue !border-b-transparent select-header !rounded-bl-none !rounded-br-none' : 'select-header'} ${disabled ? '!bg-[#eee]' : ''} ${customStyle?.header}`}
        onClick={() =>
          disabled
            ? setIsDropdownOpen(false)
            : setIsDropdownOpen(!isDropdownOpen)
        }
        tabIndex={0}
      >
        <span>{selectedValue || defaultPlaceholder}</span>
        {/* Add custom down icon */}
        <span className="icon"> {isDropdownOpen ? '▲' : '▼'}</span>
      </div>

      {isDropdownOpen && (
        <div className={`select-dropdown ${customStyle?.dropdown}`}>
          <input
            type="text"
            placeholder="Search..."
            value={search ? search : ''}
            onChange={(e) => setSearch(e.target.value)}
            className="select-search"
            autoFocus
          />
          <ul className="select-options">
            {search === null &&
            defaultPlaceholder &&
            filteredOptions.length !== 0 ? (
              <li
                onClick={() => handleSelect(defaultPlaceholder)}
                className={`${defaultPlaceholder == selectedOption ? 'bg-[#036983] text-white select-option' : 'select-option'} `}
              >
                {defaultPlaceholder}
              </li>
            ) : (
              ''
            )}

            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option || defaultPlaceholder)}
                className={`${option == selectedOption ? 'bg-[#036983] text-white select-option' : 'select-option'} !text-start`}
              >
                {option}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="text-[12px] p-3">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComboBox;
