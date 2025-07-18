import { Column } from '@tanstack/react-table';
import { useState } from 'react';
import DebouncedInput from './DebouncedInput';
import { useTranslation } from 'react-i18next';
import { FilterVariant } from '../types';
import ComboBox from '../../Comboboxes';

const Filter = <T,>({
  column,
  onFilterChange,
}: {
  column: Column<T, unknown>;
  onFilterChange: (
    val: string | null,
    field: string,
    variant: FilterVariant | null
  ) => void;
}) => {
  const { t } = useTranslation();
  const columnFilterValue = column.getFilterValue();

  const { filterVariant } = column.columnDef.meta ?? {};
  const [selectValue, setSelectedValue] = useState<string>('');
  const options = column?.columnDef?.meta?.selectionOptions || [];

  if (filterVariant === FilterVariant.SELECT)
    return (
      <div className="mb-4">
        <ComboBox
          optionsList={['All', ...options]}
          selectedValue={selectValue}
          setSelectedValue={(value) => {
            if (!value) return setSelectedValue('');
            if (value.toLocaleLowerCase() === 'all') {
              if (column.columnDef.meta?.filterKey) {
                onFilterChange(null, 'all', null);
              }
              column.setFilterValue(null);
              setSelectedValue('');
            } else {
              if (column.columnDef.meta?.filterKey) {
                onFilterChange(
                  value,
                  column.columnDef.meta?.filterKey,
                  FilterVariant.SELECT
                );
              }
              column.setFilterValue(value);
              setSelectedValue(value ? value : '');
            }
          }}
          placeholder={t('comboBox.select')}
        />
      </div>
    );
  if (filterVariant === FilterVariant.TEXT)
    return (
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
    );
  return null;
};

export default Filter;
