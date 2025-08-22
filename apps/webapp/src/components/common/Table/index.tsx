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
import React, { useState } from 'react';

import { Loader } from '@mantine/core';
import { SortDirection } from '@rhino/utils';
import { ColumnMeta } from '@tanstack/table-core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CONSTANTS } from '../../../constant';
import Filter from './Filter';
import TableFooter from './Footer';
import { FilterVariant } from './types';

interface CustomColumnMeta {
  selectionOptions?: { label: string; value: string }[];
  filterKey?: string;
  customFilter?: React.ReactNode;
  sortKey: string | null; // Same as backend sorting field name
  sortDirection?: string;
  renderCell?: (value: unknown, row: unknown) => React.ReactNode;
  selectAllChecked?: boolean;
  onSelectAll?: (checked: boolean) => void;
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
  size?: 'sm';
  textNowarp?: boolean;
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
    sortKey: string | null | undefined;
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
  size,
  textNowarp,
  onSortSelect,
  onFilterChange,
}: TableProps<T>) => {
  const { t } = useTranslation();
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
  });

  return (
    <div className="overflow-hidden relative w-full">
      <div className={clsx(`p-2 overflow-auto ${extraStyles}`)}>
        <table className={clsx('relative w-full ')}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={clsx(
                        'font-thin align-baseline pr-1.5 min-w-32 w-fit',
                        {
                          'sticky bg-rhino-white -right-5 pl-2 z-10':
                            header.id === CONSTANTS.action,
                          '!w-16 !min-w-0': header.id === 'select',
                          'text-nowrap w-auto': textNowarp,
                        }
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex flex-col justify-end w-full ">
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none text-rhino-indigo-blue flex text-[13px] pr-[1.2rem] whitespace-wrap  gap-2 min-h-[50px] justify-start '
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
                              className="text-start line-clamp-none max-h-[calc(2_*_1.5rem)]  break-words leading-snug"
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
                          <div className="flex justify-start w-full">
                            {header.column.getCanFilter() ? (
                              <div
                                className={`text-rhino-indigo-blue flex w-full`}
                              >
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

          <tbody>
            {!isLoading && table.getCoreRowModel().rows.length !== 0 && (
              <>
                {table.getCoreRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id} className={`odd:bg-[#03030405]`}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className={clsx(
                              'p-[.75rem] align-top first:pl-[.75rem] relative pl-0',
                              {
                                'sticky -right-5 bg-white':
                                  cell.column.id === CONSTANTS.action,
                              }
                            )}
                          >
                            <div
                              className={clsx(
                                'text-[13px] min-w-32 w-fit mr-5',
                                {
                                  'text-nowrap':
                                    cell.column.id === 'value' ||
                                    cell.column.id === 'read-time',
                                  'overflow-visible':
                                    cell.column.id === CONSTANTS.action,
                                  '!w-16 !min-w-0': cell.column.id === 'select',
                                  'text-nowrap h-fit': size == 'sm',
                                  'text-nowrap w-auto overflow-y-auto':
                                    textNowarp,
                                }
                              )}
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
              </>
            )}

            {!isLoading && data.length === 0 && (
              <div className="flex items-center h-52">
                <div className="text-[13px] py-5 text-rhino-indigo-blue flex justify-center items-center  bg-gray-50 absolute w-full mt-10">
                  {emptyText || t('table.notFound', { ns: 'common' })}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center h-52">
                <div className="text-[13px] py-5 text-rhino-indigo-blue flex justify-center items-center  bg-gray-50 absolute w-full mt-10">
                  <Loader color="var(--color-rhino-indigo-blue)" size={'sm'} />
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
      {/* Footer */}

      {footer && <TableFooter pagination={footer} />}
    </div>
  );
};
export default Table;
