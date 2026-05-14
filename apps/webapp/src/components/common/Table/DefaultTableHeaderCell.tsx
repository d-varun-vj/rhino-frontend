import { Header, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import { CONSTANTS } from '../../../constant';
import Filter from './Filter';
import { getSortIndicator } from './hooks/useTableLogic';
import { FilterVariant } from './types';

export interface DefaultTableHeaderCellProps<T> {
  header: Header<T, unknown>;
  index: number;
  variant?: 'default' | 'compact' | 'minimal';
  textNowarp?: boolean;
  selectedSortKey?: string | null;
  enableNoSortState?: boolean; // true keeps neutral sort icon/state, false limits to asc/desc only
  onHeaderSortClick?: (header: Header<T, unknown>) => void;
  onFilterChange?: (
    val: string | null,
    field: string,
    variant: FilterVariant | null
  ) => void;
  activeFilters?: Record<string, string | boolean | null>;
  className?: string;
  styles?: {
    title?: {
      color?: string;
      fontSize?: string;
    };
    sortIndicator?: {
      color?: string;
    };
    cursor?: string;
  };
}

export function DefaultTableHeaderCell<T>({
  header,
  index,
  variant = 'default',
  textNowarp,
  selectedSortKey,
  enableNoSortState = true,
  onHeaderSortClick,
  onFilterChange,
  activeFilters,
  className,
  styles,
}: DefaultTableHeaderCellProps<T>) {
  const handleFilterChangeLocal = (
    val: string | null,
    field: string,
    filterVariant: FilterVariant | null
  ) => {
    if (onFilterChange) {
      onFilterChange(val, field, filterVariant);
    }
  };

  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      className={clsx(
        `font-thin align-top pr-1.5 w-fit ${header.column.columnDef.meta?.styles?.maxWidth} ${header.column.columnDef.meta?.styles?.minWidth ?? 'min-w-32'}`,
        {
          'sticky bg-rhino-white -right-5 pl-2 z-10':
            header.id === CONSTANTS.action,
          '!w-8 !min-w-0': header.id === (FilterVariant.SELECT as string),
          'text-nowrap w-auto': textNowarp,
          'first:pl-[.7rem]': variant === 'compact',
          'min-w-min text-nowrap':
            variant === 'compact' || variant === 'minimal',
        },
        className
      )}
    >
      {header.isPlaceholder ? null : (
        <div className="flex flex-col justify-end w-full">
          <div
            className={clsx(
              `select-none text-rhino-indigo-blue flex text-[13px] pr-[1.2rem] whitespace-wrap gap-2 justify-start ${styles?.cursor && header.column.columnDef.meta?.sortKey !== null ? styles.cursor : ''}`,
              {
                'min-h-[50px] cursor-pointer': variant === 'default',
                'min-h-[20px] font-bold':
                  variant === 'minimal' || variant === 'compact',
              }
            )}
            onClick={() => {
              onHeaderSortClick?.(header);
            }}
            data-testid={`test-col-${index}`}
          >
            <div
              className={clsx(
                'text-start line-clamp-none max-h-[calc(2_*_1.5rem)] break-words leading-snug',
                styles?.title?.color,
                styles?.title?.fontSize
              )}
              data-testid="label"
            >
              {flexRender(header.column.columnDef.header, header.getContext())}{' '}
            </div>
            <div
              className={clsx(
                `${styles?.sortIndicator?.color ?? 'text-[#808080]'}`,
                {
                  hidden:
                    !header.column.columnDef.meta ||
                    header.column.columnDef.meta?.sortKey === null,
                }
              )}
              data-testid="sort-indicator"
            >
              {getSortIndicator(
                header.column.columnDef.meta,
                selectedSortKey,
                enableNoSortState
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
                  onFilterChange={handleFilterChangeLocal}
                  defaultFilterValue={
                    header.column.columnDef.meta?.filterKey &&
                    activeFilters !== undefined
                      ? activeFilters[header.column.columnDef.meta.filterKey] ??
                        null
                      : undefined
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </th>
  );
}
