import { Column } from '@tanstack/react-table';
import { CONSTANTS } from 'apps/webapp/src/constant';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomComboBox from '../../comboboxes/CustomComboBox';
import DebouncedTextField from '../../input/TextField/DebouncedTextField';
import { FilterVariant } from '../types';

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

  const optionsList = useMemo(
    () => [t('comboBox.select'), ...options],
    [options, t]
  );

  const filterKey = useMemo(
    () => column.columnDef.meta?.filterKey,
    [column.columnDef.meta?.filterKey]
  );

  const handleSelectValueChange = useCallback(
    (value: string | null) => {
      if (!value) {
        setSelectedValue('');
        onFilterChange(null, CONSTANTS.SELECT.ALL_OPTION, null);
        return;
      }

      if (value.toLowerCase() === CONSTANTS.SELECT.DEFAULT) {
        if (filterKey) {
          onFilterChange(null, CONSTANTS.SELECT.ALL_OPTION, null);
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
          optionsList={optionsList.map((option) => ({
            name: option,
          }))}
          placeholder={selectPlaceholder}
          selectedValue={{
            name: selectValue,
          }}
          setSelectedValue={(val) => handleSelectValueChange(val)}
        />
      </div>
    );
  }

  if (filterVariant === FilterVariant.TEXT) {
    return (
      <DebouncedTextField
        onChange={handleTextInputChange}
        value={(columnFilterValue ?? '') as string}
      />
    );
  }

  return null;
};

export default React.memo(Filter) as typeof Filter;
