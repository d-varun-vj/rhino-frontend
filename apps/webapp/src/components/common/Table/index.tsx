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
import React, { useCallback, useState } from 'react';

import { SortDirection } from '@rhino/utils';
import { ColumnMeta } from '@tanstack/table-core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CONSTANTS } from '../../../constant';
import CustomLoader from '../Loader';
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
  styles?: {
    maxWidth?: string;
    minWidth?: string;
  };
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
  variant?: 'default' | 'compact' | 'minimal';
  isLoading?: boolean;
  extraStyles?: string;
  emptyText?: string;
  size?: 'sm';
  textNowarp?: boolean;
  onSortSelect?: (field: string, direction: string) => void;
  onFilterChange?: (
    val: string | null,
    field: string,
    variant: FilterVariant | null
  ) => void;
  dataTestIdPrefix?: string;
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
  variant = 'default',
  isLoading,
  extraStyles,
  emptyText,
  size,
  textNowarp,
  onSortSelect,
  onFilterChange,
  dataTestIdPrefix,
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

  const handleFilterChange = useCallback(
    (val: string | null, field: string, variant: FilterVariant | null) => {
      if (footer) {
        footer.setCurrentPage(0);
      }

      if (onFilterChange) {
        onFilterChange(val, field, variant);
      }
    },
    [onFilterChange, footer]
  );

  return (
    <div className="overflow-hidden relative w-full flex flex-col">
      <div className={clsx(`p-2 overflow-auto flex-1 ${extraStyles}`)}>
        <div
          className={`${clsx('relative', {
            'min-h-[400px]': variant === 'default',
          })}`}
        >
          <table
            className={clsx('relative w-full h-full')}
            data-testid={`${dataTestIdPrefix}-table`}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={clsx(
                          `font-thin align-top pr-1.5 w-fit ${header.column.columnDef.meta?.styles?.maxWidth} ${header.column.columnDef.meta?.styles?.minWidth ?? 'min-w-32'}`,
                          {
                            'sticky bg-rhino-white -right-5 pl-2 z-10':
                              header.id === CONSTANTS.action,
                            '!w-8 !min-w-0':
                              header.id === (FilterVariant.SELECT as string),
                            'text-nowrap w-auto': textNowarp,
                            'first:pl-[.7rem]': variant === 'compact',
                            'min-w-min text-nowrap':
                              variant === 'compact' || variant === 'minimal',
                          }
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex flex-col justify-end w-full ">
                            <div
                              {...{
                                className: `${clsx(
                                  'select-none text-rhino-indigo-blue flex text-[13px] pr-[1.2rem] whitespace-wrap gap-2 justify-start',
                                  {
                                    'min-h-[50px] cursor-pointer':
                                      variant === 'default',
                                    'min-h-[20px] font-bold':
                                      variant === 'minimal' ||
                                      variant === 'compact',
                                  }
                                )}`,
                                onClick: () => {
                                  setSelectedSortKey(
                                    header.column.columnDef.meta?.sortKey ??
                                      null
                                  );
                                  handleSortClick(header, onSortSelect);
                                },
                              }}
                              data-testid={`test-col-${index}`}
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
                                className={`${clsx('text-[#808080]', {
                                  hidden:
                                    !header.column.columnDef.meta ||
                                    header.column.columnDef.meta?.sortKey ===
                                      null,
                                })}`}
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
                                  data-testid={`test-col-filter-${index}`}
                                >
                                  <Filter
                                    column={header.column}
                                    onFilterChange={handleFilterChange}
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
            <tbody className="relative" data-testid="test-table-body">
              {!isLoading && table.getCoreRowModel().rows.length !== 0 && (
                <>
                  {table.getCoreRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id} className={`odd:bg-[#03030405]`}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className={clsx('align-top relative pl-0', {
                                'sticky -right-5 bg-white !align-middle':
                                  cell.column.id === CONSTANTS.action,
                                'p-[.75rem]': variant === 'default',
                                'first:pl-[.7rem]':
                                  variant === 'compact' ||
                                  variant === 'default',
                                'text-rhino-grey p-[.2rem] !align-middle':
                                  variant === 'compact' ||
                                  variant === 'minimal',
                              })}
                            >
                              <div
                                className={clsx(
                                  `text-[13px] w-fit mr-5 ${cell.column.columnDef.meta?.styles?.maxWidth} ${cell.column.columnDef.meta?.styles?.minWidth ?? 'min-w-32'}`,
                                  {
                                    'text-nowrap':
                                      cell.column.id === 'value' ||
                                      cell.column.id === 'read-time',
                                    'overflow-visible':
                                      cell.column.id === CONSTANTS.action,
                                    '!w-8 !min-w-0':
                                      cell.column.id ===
                                      (FilterVariant.SELECT as string),
                                    'text-nowrap h-fit': size == 'sm',
                                    'text-nowrap w-auto overflow-y-auto':
                                      textNowarp,
                                    '!min-w-min':
                                      variant === 'compact' ||
                                      variant === 'minimal',
                                  }
                                )}
                                {...(cell.column.id === CONSTANTS.action
                                  ? { 'data-testid': 'action-cell' }
                                  : {})}
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
                <div className="absolute inset-0 flex items-center justify-center min-h-[300px]">
                  <div
                    className="text-[13px] text-rhino-indigo-blue "
                    data-testid="not-found"
                  >
                    {emptyText || t('table.notFound', { ns: 'common' })}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center min-h-[300px]">
                  <CustomLoader />
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <TableFooter pagination={footer} dataTestIdPrefix={dataTestIdPrefix} />
      )}
    </div>
  );
};
export default Table;
