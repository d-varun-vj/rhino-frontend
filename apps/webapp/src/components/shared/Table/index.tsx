import React from 'react';

import './Table.css';

import {
  ColumnDef,
  ColumnFiltersState,
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
import { SortDirection } from '../../../appRouter/Dashboard/api';

interface CustomColumnMeta {
  selectionOptions?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilterValue?: React.Dispatch<React.SetStateAction<any>>;
  isSortable: boolean;
  setSortedField?: React.Dispatch<React.SetStateAction<string>>;
  sortKey?: string; // Same as backend sorting field name
  setSortDirection?: React.Dispatch<React.SetStateAction<string>>;
  sortDirection?: string;
}
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> extends CustomColumnMeta {
    filterVariant?: 'text' | 'range' | 'select' | null;
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
};

const Table = <T,>({ columns, data, footer, isLoading }: TableProps<T>) => {
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
    <div>
      <div
        className={`p-2 overflow-auto  ${table.getRowModel().rows.length == 0 ? 'pb-[150px]' : ''}`}
      >
        <table className="relative">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="font-thin "
                    >
                      {header.isPlaceholder ? null : (
                        <div className=" flex flex-col justify-start ">
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none text-rhino-indigo-blue py-[1rem] pr-[1.2rem] flex   text-[13px]  whitespace-wrap gap-3 min-h-[80px] h-[90px] justify-start '
                                : '',
                              onClick: header.column.columnDef.meta?.isSortable
                                ? () => {
                                    if (
                                      header.column.columnDef.meta
                                        ?.setSortedField
                                    ) {
                                      header.column.columnDef.meta.setSortedField(
                                        header.column.columnDef.meta.sortKey ||
                                          ''
                                      );
                                    }
                                    if (
                                      header.column.columnDef.meta
                                        ?.setSortDirection
                                    ) {
                                      header.column.columnDef.meta.setSortDirection(
                                        header.column.columnDef.meta
                                          .sortDirection === ''
                                          ? SortDirection.ASC
                                          : header.column.columnDef.meta
                                                .sortDirection ===
                                              SortDirection.ASC
                                            ? SortDirection.DESC
                                            : ''
                                      );
                                    }
                                  }
                                : () => null,
                            }}
                          >
                            <div className="h-full text-start overflow-y-auto ">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}{' '}
                            </div>
                            <div
                              className={`${header.column.columnDef.meta?.isSortable ? 'text-[#808080]' : 'hidden'} `}
                            >
                              {header.column.columnDef.meta?.setSortDirection
                                ? header.column.columnDef.meta.sortDirection ===
                                  SortDirection.DESC
                                  ? '⇂'
                                  : header.column.columnDef.meta
                                        .sortDirection === SortDirection.ASC
                                    ? '↿'
                                    : '⇅'
                                : '⇅'}
                            </div>
                          </div>
                          <div className="flex  justify-start">
                            {header.column.getCanFilter() ? (
                              <div className="text-rhino-indigo-blue flex">
                                <Filter column={header.column} />
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
                  <tr key={row.id} className="odd:bg-[#03030405]">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="p-[.75rem] align-top">
                          <div
                            className={`ml-[.3rem] text-[13px] text-wrap  w-auto `}
                          >
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
              Not Found
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
