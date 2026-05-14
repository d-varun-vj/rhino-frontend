import { RowData, flexRender } from '@tanstack/react-table';
import React from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CONSTANTS } from '../../../constant';
import CustomLoader from '../Loader';
import TableFooter from './Footer';
import { FilterVariant } from './types';

import { DefaultTableHeaderCell } from './DefaultTableHeaderCell';
import { TableLogicProps, useTableLogic } from './hooks/useTableLogic';

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

type TableProps<T> = TableLogicProps<T> & {
  variant?: 'default' | 'compact' | 'minimal';
  isLoading?: boolean;
  extraStyles?: string;
  emptyText?: string;
  size?: 'sm';
  textNowarp?: boolean;
  dataTestIdPrefix?: string;
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
  activeFilters,
  dataTestIdPrefix,
  enableNoSortState = true,
}: TableProps<T>) => {
  const { t } = useTranslation();

  const { table, selectedSortKey, handleSortChange, handleFilterChange } =
    useTableLogic({
      columns,
      data,
      footer,
      onSortSelect,
      onFilterChange,
      enableNoSortState,
    });

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
                      <DefaultTableHeaderCell
                        key={header.id}
                        header={header}
                        index={index}
                        variant={variant}
                        textNowarp={textNowarp}
                        selectedSortKey={selectedSortKey}
                        enableNoSortState={enableNoSortState}
                        onHeaderSortClick={handleSortChange}
                        onFilterChange={handleFilterChange}
                        activeFilters={activeFilters}
                      />
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
                      <tr key={row.id} className="odd:bg-[#03030405] group">
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className={clsx('align-top relative pl-0', {
                                'sticky -right-5 bg-white group-odd:bg-[#f5f5f6] !align-middle z-10':
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
