import { ColumnDef, flexRender, Table } from '@tanstack/react-table';
import { DefaultTableHeaderCell } from 'apps/webapp/src/components/common/Table/DefaultTableHeaderCell';
import TableFooter from 'apps/webapp/src/components/common/Table/Footer';

import {
  AssetConsumptionTableData,
  AssetDashboardMedium,
  AssetType,
  MediumTableConsumption,
  usePostAssetConsumptionTableData,
} from '@rhino/apis';
import { Sort, SortDirection } from '@rhino/utils';
import CustomProgressBar from 'apps/webapp/src/components/common/ProgressBar';
import {
  FooterType,
  useTableLogic,
} from 'apps/webapp/src/components/common/Table/hooks/useTableLogic';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MEDIUM_COLORS,
  T_ASSET_LABELS,
  T_ASSET_SEARCH,
  T_MEDIUM_LABELS,
} from '../../config';
import { useAssetDashboardQueryParams } from '../../hooks';
import useDataStateFeedback from '../../hooks/useDataStateFeedback';
import SectionWrapper from '../SectionWrapper';
import ToolBar from './ToolBar';

const ASSET_COLUMN_MAX_WIDTH_PX = 350;
const ASSET_COLUMN_MIN_WIDTH_PX = 250;
const SELECT_COLUMN_WIDTH_PX = 48;
const APPROX_CHAR_WIDTH_PX = 8;
const CELL_HORIZONTAL_PADDING_PX = 48;
const MEDIUM_COLUMN_CLASS = '';
const ASSET_COLUMN_CLASS = '!max-w-[250px] !whitespace-normal break-words';
const ASSET_COLUMN_EQUAL_CLASS = '!whitespace-normal break-words';
const SELECT_COLUMN_CLASS = '';
const ASSET_COLUMN_SORT_KEY = 'NAME';

const isAssetDashboardMedium = (key: string): key is AssetDashboardMedium => {
  return Object.values(AssetDashboardMedium).includes(
    key as AssetDashboardMedium
  );
};

const getMediumByType = (
  mediums: MediumTableConsumption[],
  mediumKey: AssetDashboardMedium
): MediumTableConsumption | null => {
  return mediums.find((medium) => medium.type === mediumKey) ?? null;
};

const getNextTableAssetType = (assetType: AssetType): AssetType => {
  switch (assetType) {
    case AssetType.CLIENT:
      return AssetType.LOCATION;
    case AssetType.LOCATION:
      return AssetType.GROUP;
    case AssetType.GROUP:
      return AssetType.MEASUREMENT;
    default:
      return AssetType.MEASUREMENT;
  }
};

type MediumHeaderConfig = {
  key: AssetDashboardMedium;
  unit: string;
};

const getMediumHeaderConfig = (
  rows: AssetConsumptionTableData[]
): MediumHeaderConfig[] => {
  const availableMediums = new Set<AssetDashboardMedium>();
  const unitsByMedium = new Map<AssetDashboardMedium, string>();

  rows.forEach((row) => {
    row.mediums.forEach((medium) => {
      if (!isAssetDashboardMedium(medium.type)) return;

      availableMediums.add(medium.type);
      if (!unitsByMedium.has(medium.type)) {
        unitsByMedium.set(medium.type, medium.unit ?? '');
      }
    });
  });

  return Object.values(AssetDashboardMedium)
    .filter((mediumKey) => availableMediums.has(mediumKey))
    .map((mediumKey) => ({
      key: mediumKey,
      unit: unitsByMedium.get(mediumKey) ?? '',
    }));
};

const ConsumptionTable = () => {
  const { t } = useTranslation('assetDashboard');
  const { asset, from, to, isReady } = useAssetDashboardQueryParams();
  const assetSelectionKey = `${asset.assetType}:${[...asset.uuids]
    .sort()
    .join(',')}`;
  const [processedAssetKey, setProcessedAssetKey] = useState(assetSelectionKey);
  const isAssetSelectionChanged = processedAssetKey !== assetSelectionKey;

  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<Sort>({
    field: ASSET_COLUMN_SORT_KEY,
    direction: SortDirection.ASC,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const { setLocations, setGroups } = useUserFilter();
  const [selectedRows, setSelectedRows] = useState<AssetConsumptionTableData[]>(
    []
  );
  const selectedRowsRef = React.useRef<AssetConsumptionTableData[]>([]);
  selectedRowsRef.current = selectedRows;
  const [tableAssetType, setTableAssetType] = useState<AssetType>(
    getNextTableAssetType(asset.assetType)
  );
  const [mediumHeaderConfig, setMediumHeaderConfig] = useState<
    MediumHeaderConfig[]
  >([]);
  const [searchValue, setSearchValue] = useState<string | number>('');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const {
    mutate: postAssetConsumptionTableData,
    data: assetConsumptionTableData,
    isError,
    isPending,
  } = usePostAssetConsumptionTableData();

  useEffect(() => {
    if (!isAssetSelectionChanged) return;

    setSearchValue('');
    setCurrentPage(0);
    setCompareMode(false);
    setSelectedRows([]);
    setMediumHeaderConfig([]);
    setTableAssetType(getNextTableAssetType(asset.assetType));
    setSort((previousSort) =>
      previousSort.field === ASSET_COLUMN_SORT_KEY &&
      previousSort.direction === (SortDirection.ASC as string)
        ? previousSort
        : { field: ASSET_COLUMN_SORT_KEY, direction: SortDirection.ASC }
    );

    setProcessedAssetKey(assetSelectionKey);
  }, [asset.assetType, assetSelectionKey, isAssetSelectionChanged]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (isAssetSelectionChanged) {
      return;
    }

    postAssetConsumptionTableData({
      body: {
        media: [],
        from,
        to,
        asset,
        assetName: searchValue.toString(),
      },
      meta: {
        page: currentPage,
        size: pageSize,
        sort: {
          field: sort.field,
          direction: sort.direction,
        },
      },
    });
  }, [
    asset,
    from,
    isReady,
    postAssetConsumptionTableData,
    to,
    currentPage,
    pageSize,
    searchValue,
    sort.direction,
    sort.field,
    isAssetSelectionChanged,
  ]);

  useEffect(() => {
    const firstRowAssetType = assetConsumptionTableData?.data?.[0]?.assetType;
    if (firstRowAssetType) {
      setTableAssetType(firstRowAssetType);
    }
  }, [assetConsumptionTableData?.data]);

  useEffect(() => {
    if (assetConsumptionTableData) {
      setHasLoadedOnce(true);
      setMediumHeaderConfig(
        getMediumHeaderConfig(assetConsumptionTableData.data)
      );
    }
  }, [assetConsumptionTableData]);

  const t_assetType = T_ASSET_LABELS[tableAssetType];
  const tableAssetTypeLabel = t(t_assetType);
  const t_assetSearchType = T_ASSET_SEARCH[tableAssetType] || '';
  const tableSearchLabel = t(t_assetSearchType);

  const columns = React.useMemo<
    ColumnDef<AssetConsumptionTableData, unknown>[]
  >(() => {
    const assetsColumn: ColumnDef<AssetConsumptionTableData, unknown> = {
      accessorKey: 'assetName',
      header: tableAssetTypeLabel,
      meta: {
        renderCell: (value, row) => {
          return (
            <span
              className="underline cursor-pointer"
              onClick={() => {
                setSearchValue('');
                setCurrentPage(0);
                if (asset.assetType === AssetType.CLIENT) {
                  setLocations([
                    {
                      name: (row as AssetConsumptionTableData).assetName,
                      uuid: (row as AssetConsumptionTableData).assetUuid,
                    },
                  ]);
                }
                if (asset.assetType === AssetType.LOCATION) {
                  setGroups([
                    {
                      name: (row as AssetConsumptionTableData).assetName,
                      uuid: (row as AssetConsumptionTableData).assetUuid,
                    },
                  ]);
                }
              }}
            >
              {value as string}
            </span>
          );
        },
        sortKey: ASSET_COLUMN_SORT_KEY,
        sortDirection: sort.direction,
      },
    };

    const mediumColumns: ColumnDef<AssetConsumptionTableData, unknown>[] =
      mediumHeaderConfig.map(({ key: mediumKey, unit }) => {
        const t_medium = T_MEDIUM_LABELS[mediumKey];
        const mediumLabel = t(t_medium);

        return {
          id: mediumKey,
          header: mediumLabel + (unit ? ` (${unit})` : ''),
          accessorFn: (row) => getMediumByType(row.mediums, mediumKey),
          meta: {
            renderCell: (value: unknown) => {
              const medium = value as MediumTableConsumption | null;
              const mediumColor = MEDIUM_COLORS[mediumKey];

              if (!medium) return null;

              return (
                <CustomProgressBar
                  completed={medium.value}
                  maxCompleted={medium.total}
                  bgColor={mediumColor}
                  animateOnRender
                />
              );
            },
            sortKey: mediumKey,
            sortDirection: sort.direction,
          },
        };
      });

    const handleSelectAll = (
      checked: boolean,
      tableContext: Table<AssetConsumptionTableData>
    ) => {
      if (checked) {
        const currentlyVisible = tableContext
          .getCoreRowModel()
          .rows.map((row) => row.original);
        const map = new Map(selectedRowsRef.current.map((m) => [m.assetUuid, m]));
        currentlyVisible.forEach((m) => map.set(m.assetUuid, m));
        setSelectedRows(Array.from(map.values()));
      } else {
        const currentlyVisibleIds = new Set(
          tableContext
            .getCoreRowModel()
            .rows.map((row) => row.original.assetUuid)
        );
        setSelectedRows(
          selectedRowsRef.current.filter((m) => !currentlyVisibleIds.has(m.assetUuid))
        );
      }
    };

    const isAllVisibleSelected = (
      tableContext: Table<AssetConsumptionTableData>
    ) => {
      const visible = tableContext.getCoreRowModel().rows;
      return (
        visible.length > 0 &&
        visible.every((row) =>
          selectedRowsRef.current.some((m) => m.assetUuid === row.original.assetUuid)
        )
      );
    };

    const checkboxColumn: ColumnDef<AssetConsumptionTableData, unknown> = {
      id: 'select',
      header: ({ table }) => (
        <div className="flex h-full items-center">
          <input
            type="checkbox"
            checked={isAllVisibleSelected(table)}
            onChange={(e) => handleSelectAll(e.target.checked, table)}
            className="w-4 h-4 cursor-pointer accent-rhino-indigo-blue rounded border-gray-300"
          />
        </div>
      ),
      meta: {
        sortKey: null,
      },
      cell: ({ row }) => {
        const isSelected = selectedRowsRef.current.some(
          (m) => m.assetUuid === row.original.assetUuid
        );
        return (
          <div className="flex h-full items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRows([...selectedRowsRef.current, row.original]);
                } else {
                  setSelectedRows(
                    selectedRowsRef.current.filter(
                      (m) => m.assetUuid !== row.original.assetUuid
                    )
                  );
                }
              }}
              className="w-4 h-4 cursor-pointer accent-rhino-indigo-blue rounded border-gray-300"
            />
          </div>
        );
      },
    };

    const baseColumns = [assetsColumn, ...mediumColumns];
    return compareMode ? [checkboxColumn, ...baseColumns] : baseColumns;
  }, [
    compareMode,
    tableAssetTypeLabel,
    setLocations,
    setGroups,
    asset.assetType,
    t,
    mediumHeaderConfig,
    sort.direction,
  ]);

  const footer: FooterType = {
    totalCount: assetConsumptionTableData?.meta
      ? assetConsumptionTableData.meta.totalItems
      : 0,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  };

  const handleSortSelect = (field: string, direction: string) => {
    setSort({ field, direction });
  };
  const handleSearch = (value: string | number) => {
    setSearchValue(value);
    setCurrentPage(0);
  };

  const { table, selectedSortKey, handleSortChange } = useTableLogic({
    columns,
    data: assetConsumptionTableData?.data || [],
    footer,
    onSortSelect: handleSortSelect,
    enableNoSortState: false,
  });
  const tableRows = table.getCoreRowModel().rows;
  const hasActiveSearch = searchValue.toString().trim().length > 0;
  const hasNoRows = (assetConsumptionTableData?.data.length ?? 0) === 0;

  const initialDataStateView = useDataStateFeedback({
    isPending: isPending && !hasLoadedOnce,
    isError: isError && !hasLoadedOnce,
    isEmpty:
      !isPending &&
      !isError &&
      !hasLoadedOnce &&
      assetConsumptionTableData?.data.length === 0,
  });

  const tableDataStateView = useDataStateFeedback({
    isPending: isPending && hasLoadedOnce,
    isError: isError && hasLoadedOnce,
    isEmpty:
      !isPending &&
      !isError &&
      hasLoadedOnce &&
      (assetConsumptionTableData?.data.length ?? 0) === 0,
  });
  const shouldRenderTableState = tableDataStateView !== null;

  if (initialDataStateView) {
    return initialDataStateView;
  }

  const shouldHideSectionOnDefaultEmpty =
    hasLoadedOnce && hasNoRows && !isPending && !isError && !hasActiveSearch;

  if (shouldHideSectionOnDefaultEmpty && tableDataStateView) {
    return tableDataStateView;
  }

  const mediumCount = mediumHeaderConfig.length;
  const shouldUseEqualColumnWidth = mediumCount <= 2;
  const baseColumnCount = mediumCount + 1; // asset + all medium columns
  const assetNames =
    assetConsumptionTableData?.data?.map((row) => row.assetName) ?? [];
  const longestAssetTextLength = assetNames.reduce(
    (maxLength, name) => Math.max(maxLength, name.length),
    tableAssetTypeLabel.length
  );
  const estimatedAssetColumnWidthPx = Math.max(
    ASSET_COLUMN_MIN_WIDTH_PX,
    Math.min(
      ASSET_COLUMN_MAX_WIDTH_PX,
      longestAssetTextLength * APPROX_CHAR_WIDTH_PX + CELL_HORIZONTAL_PADDING_PX
    )
  );
  const remainingWidthExpression = `100% - ${estimatedAssetColumnWidthPx}px${
    compareMode ? ` - ${SELECT_COLUMN_WIDTH_PX}px` : ''
  }`;
  const availableWidthExpression = `100%${
    compareMode ? ` - ${SELECT_COLUMN_WIDTH_PX}px` : ''
  }`;
  const equalColumnWidth =
    baseColumnCount > 0
      ? `calc((${availableWidthExpression}) / ${baseColumnCount})`
      : undefined;
  const mediumColumnWidth =
    mediumCount > 0
      ? `calc((${remainingWidthExpression}) / ${mediumCount})`
      : undefined;

  return (
    <SectionWrapper
      title={tableAssetTypeLabel}
      id="asset-consumption-table"
      className="!gap-0"
    >
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-sans mt-4">
        <ToolBar
          selectedRows={selectedRows}
          compareMode={compareMode}
          setSelectedRows={setSelectedRows}
          setCompareMode={setCompareMode}
          searchValue={searchValue}
          onSearch={handleSearch}
          searchPlaceholder={tableSearchLabel}
        />

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <colgroup>
              {table.getAllLeafColumns().map((column) => {
                if (column.id === 'select') {
                  return (
                    <col
                      key={column.id}
                      style={{
                        width: `${SELECT_COLUMN_WIDTH_PX}px`,
                        minWidth: `${SELECT_COLUMN_WIDTH_PX}px`,
                      }}
                    />
                  );
                }

                if (isAssetDashboardMedium(column.id)) {
                  return (
                    <col
                      key={column.id}
                      style={{
                        width: shouldUseEqualColumnWidth
                          ? equalColumnWidth
                          : mediumColumnWidth,
                        minWidth: shouldUseEqualColumnWidth
                          ? equalColumnWidth
                          : mediumColumnWidth,
                      }}
                    />
                  );
                }

                return (
                  <col
                    key={column.id}
                    style={{
                      width: shouldUseEqualColumnWidth
                        ? equalColumnWidth
                        : `${estimatedAssetColumnWidthPx}px`,
                      maxWidth: shouldUseEqualColumnWidth
                        ? undefined
                        : `${ASSET_COLUMN_MAX_WIDTH_PX}px`,
                    }}
                  />
                );
              })}
            </colgroup>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-gray-100 bg-white"
                >
                  {headerGroup.headers.map((header, index) => {
                    const isMediumColumn = isAssetDashboardMedium(header.id);
                    const isSelectColumn = header.id === 'select';

                    return (
                      <DefaultTableHeaderCell
                        key={header.id}
                        header={header}
                        index={index}
                        variant="minimal"
                        selectedSortKey={
                          selectedSortKey ?? ASSET_COLUMN_SORT_KEY
                        }
                        enableNoSortState={false}
                        onHeaderSortClick={handleSortChange}
                        className={`px-6 py-5 text-[14px] font-bold whitespace-nowrap bg-white !min-w-0 ${
                          isSelectColumn
                            ? SELECT_COLUMN_CLASS
                            : isMediumColumn
                              ? MEDIUM_COLUMN_CLASS
                              : shouldUseEqualColumnWidth
                                ? ASSET_COLUMN_EQUAL_CLASS
                                : ASSET_COLUMN_CLASS
                        }`}
                        styles={{
                          title: {
                            color:
                              header.id === 'assetName'
                                ? 'text-black'
                                : 'text-rhino-grey',
                            fontSize: 'text-[14px]',
                          },
                          sortIndicator: {
                            color: 'text-black',
                          },
                          cursor: 'cursor-pointer',
                        }}
                      />
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {shouldRenderTableState ? (
                <tr>
                  <td
                    colSpan={Math.max(table.getAllLeafColumns().length, 1)}
                    className="py-8"
                  >
                    <div className="flex items-center justify-center">
                      {tableDataStateView}
                    </div>
                  </td>
                </tr>
              ) : (
                tableRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 text-sm last:border-0"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isMediumColumn = isAssetDashboardMedium(
                        cell.column.id
                      );
                      const isSelectColumn = cell.column.id === 'select';

                      return (
                        <td
                          key={cell.id}
                          className={`px-6 py-3 align-middle ${
                            isSelectColumn
                              ? SELECT_COLUMN_CLASS
                              : isMediumColumn
                                ? MEDIUM_COLUMN_CLASS
                                : shouldUseEqualColumnWidth
                                  ? ASSET_COLUMN_EQUAL_CLASS
                                  : ASSET_COLUMN_CLASS
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
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {footer && <TableFooter pagination={footer} dataTestIdPrefix={''} />}
    </SectionWrapper>
  );
};

export default ConsumptionTable;
