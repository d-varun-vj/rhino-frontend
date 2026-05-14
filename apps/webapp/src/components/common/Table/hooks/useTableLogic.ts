import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  useReactTable,
} from '@tanstack/react-table';
import React, { useCallback, useState } from 'react';

import { SortDirection } from '@rhino/utils';
import { ColumnMeta } from '@tanstack/table-core';
import { CONSTANTS } from 'apps/webapp/src/constant';
import { FilterVariant } from '../types';

export type FooterType = {
  totalCount: number;
  currentPage: number;
  totalPages?: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
};

export type TableLogicProps<T> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  footer?: FooterType;
  onSortSelect?: (field: string, direction: string) => void;
  onFilterChange?: (
    val: string | null,
    field: string,
    variant: FilterVariant | null
  ) => void;
  activeFilters?: Record<string, string | boolean | null>;
  manualPagination?: boolean;
  enableNoSortState?: boolean; // true keeps neutral sort icon/state, false limits to asc/desc only
};

export const getSortDirection = <T>(
  meta?: ColumnMeta<T, unknown>,
  enableNoSortState = true
): SortDirection | '' => {
  switch (meta?.sortDirection) {
    case SortDirection.ASC:
      return SortDirection.DESC;
    case SortDirection.DESC:
      return enableNoSortState ? '' : SortDirection.ASC;
    default:
      return SortDirection.ASC;
  }
};

export const handleSortClick = <T>(
  header: Header<T, unknown>,
  onSortSelect?: (field: string, direction: SortDirection | string) => void,
  enableNoSortState = true
) => {
  const sortKey = header.column.columnDef?.meta?.sortKey;
  if (!onSortSelect || sortKey === undefined || sortKey === null) return;

  onSortSelect(
    sortKey,
    getSortDirection(header.column.columnDef?.meta, enableNoSortState)
  );
};

export const getSortIndicator = (
  meta?: {
    sortDirection?: SortDirection | string;
    sortKey: string | null | undefined;
  },
  selectedSortKey?: string | null,
  enableNoSortState = true
): string => {
  if (!enableNoSortState && meta?.sortKey !== selectedSortKey) {
    return '';
  }

  if (!meta?.sortDirection) {
    return enableNoSortState ? CONSTANTS.sortIndicator.noSort : '';
  }

  const direction = meta.sortDirection as SortDirection;
  if (meta.sortKey === selectedSortKey) {
    switch (direction) {
      case SortDirection.ASC:
        return CONSTANTS.sortIndicator.asc;
      case SortDirection.DESC:
        return CONSTANTS.sortIndicator.desc;
    }
  }
  return enableNoSortState ? CONSTANTS.sortIndicator.noSort : '';
};

export const useTableLogic = <T>({
  columns,
  data,
  footer,
  onSortSelect,
  onFilterChange,
  enableNoSortState = true,
}: TableLogicProps<T>) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedSortKey, setSelectedSortKey] = useState<string | null>(null);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
      pagination: {
        pageIndex: footer?.currentPage ?? 0,
        pageSize: footer?.pageSize ?? 5,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFilterChange = useCallback(
    (val: string | null, field: string, variant: FilterVariant | null) => {
      if (footer) {
        footer.setCurrentPage(0);
      }

      if (onFilterChange) {
        onFilterChange(val?.trim() ?? null, field, variant);
      }
    },
    [onFilterChange, footer]
  );

  const handleSortChange = useCallback(
    (header: Header<T, unknown>) => {
      setSelectedSortKey(header.column.columnDef.meta?.sortKey ?? null);
      handleSortClick(header, onSortSelect, enableNoSortState);
    },
    [enableNoSortState, onSortSelect]
  );

  return {
    table,
    selectedSortKey,
    handleSortChange,
    handleFilterChange,
  };
};
