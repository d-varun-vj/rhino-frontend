import { Column } from '@tanstack/react-table';
import { useState } from 'react';
import DebouncedInput from './DebouncedInput';
import ComboBox from '../../Comboboxes';
import { useTranslation } from 'react-i18next';
import { FilterVariant } from '../types';

const Filter = <T,>({
  column,
  onFilterChange,
}: {
  column: Column<T, unknown>;
  onFilterChange: (
    val: string | null,
    field: string,
    varient: FilterVariant | null
  ) => void;
}) => {
  const { t } = useTranslation();
  const columnFilterValue = column.getFilterValue();

  const { filterVariant } = column.columnDef.meta ?? {};
  const [selectValue, setSelectedValue] = useState<string | null>(null);
  const options = column?.columnDef?.meta?.selectionOptions || [];

  return filterVariant === FilterVariant.SELECT ? (
    <ComboBox
      options={options}
      defaultPlaceholder={t('comboBox.select')}
      disabled={false}
      selectedValue={selectValue}
      setReturnValue={(value) => {
        if (value === 'all') {
          if (column.columnDef.meta?.filterKey) {
            onFilterChange(null, 'all', null);
          }
          column.setFilterValue(null);
          setSelectedValue(null);
        } else {
          if (column.columnDef.meta?.filterKey) {
            onFilterChange(
              value,
              column.columnDef.meta?.filterKey,
              FilterVariant.SELECT
            );
          }
          column.setFilterValue(value);
          setSelectedValue(value ? value : null);
        }
      }}
      customStyle={{
        header:
          'mb-[16px] h-auto py-[5.5px] rounded px-[10px] focus-within:rounded-bl-none focus-within:rounded-br-none !min-w-[9rem] overflow-hidden  whitespace-nowrap',
        dropdown: 'mt-[-16px]  !min-w-[9rem]',
      }}
    />
  ) : filterVariant === FilterVariant.TEXT ? (
    <DebouncedInput
      className="rounded"
      onChange={(value) => {
        if (column.columnDef.meta?.filterKey) {
          onFilterChange(
            value.toString(),
            column?.columnDef?.meta?.filterKey,
            FilterVariant.TEXT
          );
        }
      }}
      placeholder={``}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  ) : (
    <input type="text" className=" " disabled />
  );
};

export default Filter;
