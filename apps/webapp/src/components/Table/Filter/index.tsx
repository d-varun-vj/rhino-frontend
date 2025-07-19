import { Column } from '@tanstack/react-table';
import React, { useState, useMemo, useCallback } from 'react';
import DebouncedInput from './DebouncedInput';
import { useTranslation } from 'react-i18next';
import { FilterVariant } from '../types';
import CustomComboBox from '../../Comboboxes';
import { CONSTANTS } from 'apps/webapp/src/constant';

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

  const options = useMemo(
    () => column?.columnDef?.meta?.selectionOptions || [],
    [column?.columnDef?.meta?.selectionOptions]
  );

  const optionsList = useMemo(() => ['All', ...options], [options]);

  const filterKey = useMemo(
    () => column.columnDef.meta?.filterKey,
    [column.columnDef.meta?.filterKey]
  );

  const handleSelectValueChange = useCallback(
    (value: string) => {
      if (!value) {
        setSelectedValue('');
        return;
      }

      if (value.toLowerCase() === CONSTANTS.SELECT_ALL_OPTION) {
        if (filterKey) {
          onFilterChange(null, CONSTANTS.SELECT_ALL_OPTION, null);
        }
        column.setFilterValue(null);
        setSelectedValue('');
        return;
      }

      if (filterKey) {
        onFilterChange(value, filterKey, FilterVariant.SELECT);
      }

      column.setFilterValue(value);
      setSelectedValue(value || '');
    },
    [filterKey, onFilterChange, column]
  );

  const handleTextInputChange = useCallback(
    (value: string | number) => {
      if (filterKey) {
        onFilterChange(value.toString(), filterKey, FilterVariant.TEXT);
      }
    },
    [filterKey, onFilterChange]
  );

  const selectPlaceholder = useMemo(() => t('comboBox.select'), [t]);

  if (filterVariant === FilterVariant.SELECT) {
    return (
      <div className="mb-4">
        <CustomComboBox
          optionsList={optionsList}
          selectedValue={selectValue}
          setSelectedValue={handleSelectValueChange}
          placeholder={selectPlaceholder}
        />
      </div>
    );
  }

  if (filterVariant === FilterVariant.TEXT) {
    return (
      <DebouncedInput
        className="rounded"
        onChange={handleTextInputChange}
        type="text"
        value={(columnFilterValue ?? '') as string}
      />
    );
  }

  return null;
};

export default React.memo(Filter) as typeof Filter;
