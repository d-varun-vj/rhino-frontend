import { Fragment, useState } from 'react';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface ComboBoxProps {
  options: string[];
  defaultPlaceholder: string;
  disabled: boolean;
  onSelect: (data: string | null) => void;
  selectedValue: string | null;
  width?: string;
  customStyle?: string;
}
const ComboBox = ({
  options,
  defaultPlaceholder,
  disabled,
  onSelect,
  selectedValue,
  width,
  customStyle,
}: ComboBoxProps) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox
      value={selectedValue}
      onChange={(value) => onSelect(value)}
      onClose={() => setQuery('')}
    >
      <div className="relative">
        <ComboboxButton as="div" disabled={disabled}>
          <ComboboxInput
            className={clsx(
              'flex items-center cursor-pointer justify-between  pl-[0.875rem] pt-[0.55rem] pb-[0.5rem] pr-[1rem] text-[0.8125rem] leading-[1.47] border-[1px] rounded border[#e5e5e5] whitespace-nowrap overflow-hidden !m-0 ',
              width,
              customStyle
            )}
            displayValue={(option: string) => option}
            onChange={(event) => setQuery(event.target.value)}
            readOnly={disabled}
            placeholder={defaultPlaceholder}
          />
        </ComboboxButton>
        <ComboboxButton
          className="group absolute inset-y-0 right-0 px-2.5"
          hidden={disabled}
        >
          <ChevronDownIcon className="size-4 fill-rhino-indigo-blue group-data-hover:bg-yellow-500" />
        </ComboboxButton>
        <ComboboxOptions
          anchor="bottom start"
          className={clsx(
            'empty:invisible bg-rhino-white border-[1px] border-rhino-indigo-blue rounded z-30 px-3 py-1  mt-1  text-sm !max-h-72',
            width
          )}
        >
          <div className="py-3">
            {filteredOptions.length !== 0 && query === '' && (
              <ComboboxOption value={'all'}>
                {({ focus }) => (
                  <div
                    className={clsx(
                      'group flex gap-2 px-2 py-2 text-[13px]',
                      focus &&
                        'bg-rhino-indigo-blue-highlight text-rhino-white',
                      selectedValue == 'all' &&
                        'bg-rhino-energy-green text-rhino-white'
                    )}
                  >
                    All
                  </div>
                )}
              </ComboboxOption>
            )}
            {filteredOptions.map((option, index) => (
              <ComboboxOption as={Fragment} key={index} value={option}>
                {({ focus }) => (
                  <div
                    className={clsx(
                      'group flex gap-2 px-2 py-2 text-[13px]',
                      focus &&
                        'bg-rhino-indigo-blue-highlight text-rhino-white',
                      selectedValue == option &&
                        'bg-rhino-energy-green text-rhino-white'
                    )}
                  >
                    {option}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </div>
          {filteredOptions.length === 0 && (
            <div className="text-rhino-yellow w-full text-[13px] pb-3">
              No results
            </div>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default ComboBox;
