import React from 'react';

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

import Filter from './Filter';
import TableFooter from './Footer';

import { FilterVariant } from './types';
import { SortDirection } from '../../../types/shared/table';
import { ColumnMeta } from '@tanstack/table-core';
import { CONSTANTS } from '../../../constant';

interface CustomColumnMeta {
  selectionOptions?: string[];
  filterKey?: string;
  sortKey: string | null; // Same as backend sorting field name
  sortDirection?: string;
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
    varient: FilterVariant | null
  ) => void;
};

const getSortDirection = <T,>(
  meta?: ColumnMeta<T, unknown>
): SortDirection | string => {
  const direction = meta?.sortDirection;
  return direction === ''
    ? SortDirection.ASC
    : direction === SortDirection.ASC
      ? SortDirection.DESC
      : '';
};

const handleSortClick = <T,>(
  header: Header<T, unknown>,
  onSortSelect?: (field: string, direction: SortDirection | string) => void
) => {
  const sortKey = header.column.columnDef?.meta?.sortKey;
  if (!onSortSelect || sortKey === undefined || sortKey === null) return;

  onSortSelect(sortKey, getSortDirection(header.column.columnDef?.meta));
};

const getSortIndicator = (meta?: { sortDirection?: string }) => {
  if (!meta?.sortDirection) return '⇅';
  const direction = meta.sortDirection as SortDirection;
  return direction === SortDirection.DESC
    ? '⇂'
    : direction === SortDirection.ASC
      ? '↿'
      : '⇅';
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

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
      pagination: {
        pageIndex: 0,
        pageSize: footer?.pageSize ? footer.pageSize : 5,
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
    <div className="">
      <div
        className={`p-2 overflow-auto   ${table.getRowModel().rows.length == 0 ? 'pb-[150px]' : ''}  ${extraStyles}`}
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
                      className={`${header.id == CONSTANTS.action && 'sticky bg-white -right-5 pl-2 '} font-thin`}
                    >
                      {header.isPlaceholder ? null : (
                        <div className=" flex flex-col justify-start ">
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none text-rhino-indigo-blue  pr-[1.2rem] flex   text-[13px]  whitespace-wrap gap-3 min-h-[80px] h-[100px] justify-start '
                                : '',
                              onClick: () =>
                                handleSortClick(header, onSortSelect),
                            }}
                          >
                            <div className="h-full text-start  overflow-y-auto">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}{' '}
                            </div>
                            <div
                              className={`${header.column.columnDef.meta?.sortKey !== null ? 'text-[#808080]' : 'hidden'}`}
                            >
                              {getSortIndicator(header.column.columnDef.meta)}
                            </div>
                          </div>
                          <div className="flex  justify-start">
                            {header.column.getCanFilter() ? (
                              <div className="text-rhino-indigo-blue flex">
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
          {table.getRowModel().rows.length !== 0 ? (
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className={`odd:bg-[#03030405]`}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={`${cell.column.id === CONSTANTS.action && 'sticky -right-5'} p-[.75rem] align-top pl-0 first:pl-[.75rem]`}
                        >
                          <div className={` text-[13px] text-wrap  w-auto `}>
                            {flexRender(
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
          ) : isLoading ? (
            <div className="text-[13px] py-5 text-rhino-indigo-blue flex justify-center items-center  bg-gray-50 absolute  w-full mt-10">
              Loading...
            </div>
          ) : (
            <div className="text-[13px] py-5 text-rhino-indigo-blue flex justify-center items-center  bg-gray-50 absolute  w-full mt-10">
              {emptyText || 'Not Found'}
            </div>
          )}
        </table>
      </div>
      {/* Footer */}
      {footer && <TableFooter pagination={footer} />}
    </div>
  );
};
export default Table;
