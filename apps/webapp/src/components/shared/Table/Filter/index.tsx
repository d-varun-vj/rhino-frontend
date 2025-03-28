import { Column } from '@tanstack/react-table';
import { useState } from 'react';
import DebouncedInput from './DebouncedInput';
import ComboBox from '../../Comboboxes';

const Filter = <T,>({ column }: { column: Column<T, unknown> }) => {
  const columnFilterValue = column.getFilterValue();

  const { filterVariant } = column.columnDef.meta ?? {};
  const [selectValue, setSelectedValue] = useState<string>('');
  const options = column?.columnDef?.meta?.selectionOptions || [];

  return filterVariant === 'range' ? (
    <div className="">
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className=" rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className=" rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <ComboBox
      options={options}
      defaultPlaceholder="select"
      disabled={false}
      selectedValue={selectValue}
      setReturnValue={(value) => {
        if (value === 'all') {
          if (column.columnDef.meta?.setFilterValue) {
            column?.columnDef?.meta?.setFilterValue(null);
          }
          column.setFilterValue(null);
          setSelectedValue('');
        } else {
          if (column.columnDef.meta?.setFilterValue) {
            column?.columnDef?.meta?.setFilterValue(value);
          }
          column.setFilterValue(value);
          setSelectedValue(value ? value : '');
        }
      }}
      customStyle={{
        header:
          'mb-[16px] h-auto py-[5.5px] rounded px-[10px] focus-within:rounded-bl-none focus-within:rounded-br-none !min-w-[9rem] overflow-hidden  whitespace-nowrap',
        dropdown: 'mt-[-16px]  !min-w-[9rem]',
      }}
    />
  ) : filterVariant === null ? (
    <input type="text" className=" " disabled />
  ) : (
    <DebouncedInput
      className="rounded"
      onChange={(value) => {
        if (column.columnDef.meta?.setFilterValue) {
          column?.columnDef?.meta?.setFilterValue(value);
        }
      }}
      placeholder={``}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  );
};

export default Filter;
