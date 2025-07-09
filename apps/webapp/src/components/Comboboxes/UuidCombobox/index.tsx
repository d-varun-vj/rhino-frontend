import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useState } from 'react';
import clsx from 'clsx';

type Group = { name: string; uuid: string };

interface Props {
  options: {
    name: string;
    uuid: string;
    groups?: Group[];
    logo?: string;
  }[];
  defaultPlaceholder: string;
  disabled: boolean;
  onSelect: (
    data: { name: string; uuid: string; logo?: string } | null
  ) => void;
  selectedValue: {
    name: string;
    uuid: string;
    logo?: string;
  } | null;
  dataTestId?: string;
}

const UuidCombobox = ({
  options,
  defaultPlaceholder,
  disabled,
  onSelect,
  selectedValue,
  dataTestId,
}: Props) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter(
          (option) =>
            option.name.toLowerCase().includes(query.toLowerCase()) ||
            option.groups?.some((group) =>
              group.name.toLowerCase().includes(query.toLowerCase())
            )
        );

  return (
    <Combobox
      value={selectedValue}
      onChange={(value) => {
        return onSelect(value);
      }}
      onClose={() => setQuery('')}
    >
      <div className="relative">
        <ComboboxButton as="div" disabled={disabled}>
          <ComboboxInput
            className={clsx(
              'flex items-center cursor-pointer justify-between  pl-[0.875rem] pt-[0.55rem] pb-[0.5rem] pr-[1rem] h-[2.5rem] text-[0.8125rem] leading-[1.47] border-[1px] rounded border-[#e5e5e5] whitespace-nowrap overflow-hidden !m-0 w-[14rem]',
              disabled && 'bg-grey/10 !cursor-default'
            )}
            displayValue={(option: { id: number; name: string }) =>
              option?.name
            }
            onChange={(event) => setQuery(event.target.value)}
            autoFocus={!disabled}
            readOnly={disabled}
            placeholder={defaultPlaceholder}
            data-testid={dataTestId}
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
            'empty:invisible bg-rhino-white border-[1px] border-rhino-indigo-blue rounded z-30 px-3 py-1  mt-1  text-sm  w-[14rem] !max-h-72'
          )}
        >
          <div className="py-3">
            {filteredOptions.length !== 0 && query === '' && (
              <ComboboxOption value={null}>
                {({ focus }) => (
                  <div
                    className={clsx(
                      'group flex gap-2 px-2 py-2 text-[13px]',
                      focus &&
                        'bg-rhino-indigo-blue-highlight text-rhino-white',
                      selectedValue?.name == null &&
                        'bg-rhino-energy-green text-rhino-white'
                    )}
                  >
                    Select
                  </div>
                )}
              </ComboboxOption>
            )}
            {filteredOptions.map((option, index) => {
              return option.groups ? (
                <React.Fragment key={index}>
                  {option.name && (
                    <p className="text-sm py-4 text-gray-500">{option.name}</p>
                  )}
                  {option.groups.map((group, index) => (
                    <ComboboxOption
                      as={Fragment}
                      key={`${index}`}
                      value={group}
                    >
                      {({ focus }) => (
                        <div
                          className={clsx(
                            'group flex gap-2 px-2 py-2 text-[13px] cursor-pointer',
                            focus &&
                              'bg-rhino-indigo-blue-highlight text-rhino-white',
                            selectedValue?.name == group.name &&
                              'bg-rhino-energy-green text-rhino-white'
                          )}
                        >
                          {group.name}
                        </div>
                      )}
                    </ComboboxOption>
                  ))}
                </React.Fragment>
              ) : (
                <ComboboxOption as={Fragment} key={option.uuid} value={option}>
                  {({ focus }) => (
                    <div
                      className={clsx(
                        'group flex gap-2 px-2 py-2 text-[13px] cursor-pointer',
                        focus &&
                          'bg-rhino-indigo-blue-highlight text-rhino-white',
                        selectedValue?.name == option.name &&
                          'bg-rhino-energy-green text-rhino-white'
                      )}
                    >
                      {option.name}
                    </div>
                  )}
                </ComboboxOption>
              );
            })}
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

export default UuidCombobox;
