import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Column } from '@tanstack/react-table';
import { CONSTANTS } from 'apps/webapp/src/constant';
import { useTranslation } from 'react-i18next';
import CustomComboBox from '../../comboboxes/CustomComboBox';
import CheckBox from '../../input/Checkbox';
import DebouncedTextField from '../../input/TextField/DebouncedTextField';
import { FilterVariant } from '../types';

const Filter = <T,>({
  column,
  onFilterChange,
  defaultFilterValue = undefined,
}: {
  column: Column<T, unknown>;
  onFilterChange: (
    val: string | null,
    field: string,
    variant: FilterVariant | null
  ) => void;
  defaultFilterValue?: string | boolean | null;
}) => {
  const { t } = useTranslation('components');
  const columnFilterValue = column.getFilterValue();

  const { filterVariant, customFilter } = column.columnDef.meta ?? {};
  const [selectValue, setSelectValue] = useState<string | boolean | null>('');

  const options = useMemo(
    () => column?.columnDef?.meta?.selectionOptions || [],
    [column?.columnDef?.meta?.selectionOptions]
  );

  const optionsList = useMemo(
    () => [{ label: t('comboBox.select'), value: 'select' }, ...options],
    [options, t]
  );

  const filterKey = useMemo(
    () => column.columnDef.meta?.filterKey,
    [column.columnDef.meta?.filterKey]
  );

  useEffect(() => {
    if (defaultFilterValue === undefined) {
      return;
    }

    if (filterVariant === FilterVariant.SELECT) {
      setSelectValue(defaultFilterValue ?? '');
      column.setFilterValue(defaultFilterValue || null);
      return;
    }

    if (filterVariant === FilterVariant.TEXT) {
      column.setFilterValue(defaultFilterValue || null);
    }
  }, [column, defaultFilterValue, filterVariant]);

  const handleSelectValueChange = useCallback(
    (value: string | null) => {
      if (!filterKey) {
        return;
      }

      if (!value) {
        setSelectValue('');
        column.setFilterValue(null);
        onFilterChange(null, filterKey, FilterVariant.SELECT);
        return;
      }

      if (value.toLowerCase() === CONSTANTS.SELECT.DEFAULT) {
        if (filterKey) {
          onFilterChange(null, filterKey, FilterVariant.SELECT);
        }
        column.setFilterValue(null);
        setSelectValue('');
        return;
      }

      if (filterKey) {
        onFilterChange(value, filterKey, FilterVariant.SELECT);
      }

      column.setFilterValue(value);
      setSelectValue(value || '');
    },
    [filterKey, onFilterChange, column]
  );

  const handleTextInputChange = useCallback(
    (value: string | number) => {
      const filterValue = value.toString();
      column.setFilterValue(filterValue || null);
      if (filterKey) {
        onFilterChange(filterValue, filterKey, FilterVariant.TEXT);
      }
    },
    [column, filterKey, onFilterChange]
  );

  const selectPlaceholder = useMemo(() => t('comboBox.select'), [t]);

  if (filterVariant === FilterVariant.SELECT_ALL) {
    const { selectAllChecked, onSelectAll } = column.columnDef.meta ?? {};

    return (
      <div className="flex items-center ml-3 mt-2 w-fit min-w-8">
        <CheckBox
          checked={selectAllChecked || false}
          onChange={(e) => onSelectAll?.(e.target.checked)}
        />
      </div>
    );
  }

  if (filterVariant === FilterVariant.SELECT) {
    return (
      <div className="mb-4 w-full">
        <CustomComboBox
          optionsList={optionsList.map((option) => ({
            name: option.label,
          }))}
          placeholder={selectPlaceholder}
          selectedValue={{
            name:
              optionsList.find((option) => option.value === selectValue)
                ?.label ?? '',
          }}
          setSelectedValue={(val) => {
            handleSelectValueChange(
              optionsList.find((option) => option.label === val)?.value ?? null
            );
          }}
        />
      </div>
    );
  }

  if (filterVariant === FilterVariant.TEXT) {
    return (
      <DebouncedTextField
        onChange={handleTextInputChange}
        value={
          ((columnFilterValue ?? defaultFilterValue ?? '') as string) || ''
        }
      />
    );
  }

  if (filterVariant === FilterVariant.CUSTOM && customFilter) {
    return customFilter;
  }

  return null;
};

export default React.memo(Filter) as typeof Filter;
