import './Table.css';

import {
  ColumnDef,
  ColumnFiltersState,
  Header,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { CONSTANTS } from '../../constant';
import { ColumnMeta } from '@tanstack/table-core';
import Filter from './Filter';
import { FilterVariant } from './types';
import React, { useState } from 'react';
import { SortDirection } from '@rhino/utils';
import TableFooter from './Footer';

interface CustomColumnMeta {
  selectionOptions?: string[];
  filterKey?: string;
  sortKey: string | null; // Same as backend sorting field name
  sortDirection?: string;
  renderCell?: (value: unknown, row: unknown) => React.ReactNode;
}
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> extends CustomColumnMeta {
    filterVariant?: FilterVariant | null;
  }
}

export type FooterType = {
  totalCount: number;
  currentPage: number;
  totalPages?: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
};

type TableProps<T> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  footer?: FooterType;
  isLoading?: boolean;
  extraStyles?: string;
  emptyText?: string;
  onSortSelect?: (field: string, direction: string) => void;
  onFilterChange: (
    val: string | null,
    field: string,
    variant: FilterVariant | null
  ) => void;
};

const getSortDirection = <T,>(
  meta?: ColumnMeta<T, unknown>
): SortDirection | '' => {
  switch (meta?.sortDirection) {
    case SortDirection.ASC:
      return SortDirection.DESC;
    case SortDirection.DESC:
      return '';
    default:
      return SortDirection.ASC;
  }
};

const handleSortClick = <T,>(
  header: Header<T, unknown>,
  onSortSelect?: (field: string, direction: SortDirection | string) => void
) => {
  const sortKey = header.column.columnDef?.meta?.sortKey;
  if (!onSortSelect || sortKey === undefined || sortKey === null) return;

  onSortSelect(sortKey, getSortDirection(header.column.columnDef?.meta));
};

const getSortIndicator = (
  meta?: {
    sortDirection?: SortDirection | string;
    sortKey?: string | null | undefined;
  },
  selectedSortKey?: string | null
): string => {
  if (!meta?.sortDirection) {
    return CONSTANTS.sortIndicator.noSort;
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
  return CONSTANTS.sortIndicator.noSort;
};

const Table = <T,>({
  columns,
  data,
  footer,
  isLoading,
  extraStyles,
  emptyText,
  onSortSelect,
  onFilterChange,
}: TableProps<T>) => {
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
        pageIndex: 0,
        pageSize: footer?.pageSize ?? 5,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div
        className={`p-2 overflow-auto ${extraStyles ?? 'overflow-y-hidden'} `}
      >
        <table className="relative w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`${header.id == CONSTANTS.action && 'sticky bg-rhino-white -right-5 pl-2 '} font-thin`}
                    >
                      {header.isPlaceholder ? null : (
                        <div className=" flex flex-col justify-start ">
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none text-rhino-indigo-blue pr-[1.2rem] flex text-[13px] whitespace-wrap gap-3 min-h-[80px] justify-start'
                                : '',
                              onClick: () => {
                                setSelectedSortKey(
                                  header.column.columnDef.meta?.sortKey ?? null
                                );
                                handleSortClick(header, onSortSelect);
                              },
                            }}
                            data-testid={`test-${header.id}`}
                          >
                            <div
                              className="h-full text-start  overflow-y-auto"
                              data-testid="label"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}{' '}
                            </div>
                            <div
                              className={`${header.column.columnDef.meta?.sortKey !== null ? 'text-[#808080]' : 'hidden'}`}
                              data-testid="sort-indicator"
                            >
                              {getSortIndicator(
                                header.column.columnDef.meta,
                                selectedSortKey
                              )}
                            </div>
                          </div>
                          <div className="flex  justify-start">
                            {header.column.getCanFilter() ? (
                              <div className={`text-rhino-indigo-blue flex `}>
                                <Filter
                                  column={header.column}
                                  onFilterChange={onFilterChange}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {/* Table Data Body */}

          {!isLoading && table.getCoreRowModel().rows.length !== 0 && (
            <tbody>
              {table.getCoreRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className={`odd:bg-[#03030405]`}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={`${cell.column.id === CONSTANTS.action && 'sticky -right-5 bg-white'} p-[.75rem] align-top first:pl-[.75rem] `}
                        >
                          <div
                            className={`text-[13px] text-wrap w-auto ${
                              cell.column.id === 'value' ||
                              cell.column.id === 'read-time'
                                ? 'text-nowrap'
                                : ''
                            }`}
                          >
                            {cell.column.columnDef.meta?.renderCell
                              ? cell.column.columnDef.meta.renderCell(
                                  cell.getValue(),
                                  cell.row.original
                                )
                              : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {isLoading && (
          <div className="flex items-center h-96">
            <div className="text-[13px] py-5 text-rhino-indigo-blue flex justify-center items-center  bg-gray-50 absolute  w-[95%] mt-10">
              Loading...
            </div>
          </div>
        )}

        {!isLoading && data.length === 0 && (
          <div className="flex items-center h-96">
            <div className="text-[13px] py-5 text-rhino-indigo-blue flex justify-center items-center  bg-gray-50 absolute  w-[95%] mt-10">
              {emptyText || 'Not Found'}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      {footer && <TableFooter pagination={footer} />}
    </div>
  );
};
export default Table;
