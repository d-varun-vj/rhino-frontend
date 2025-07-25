import {
  MeasurementFilter,
  MeasurementType,
  NameWithTranslationDto,
  useGetMeasurementList,
  useGetMetaData,
} from '@rhino/apis';
import React, { useCallback, useState } from 'react';

import { Radio } from '@mantine/core';
import { Sort } from '@rhino/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../context/user';
import CheckBox from '../../common/input/Checkbox';
import Table from '../../common/Table';
import { FilterVariant } from '../../common/Table/types';

interface MeasurementsWithPaginationTableProps {
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedIds?: string[];
  onSelectionChange?: (selectedMeasurements: MeasurementType[]) => void;
  readonly?: boolean;
}

const MeasurementsWithPaginationTable = ({
  selectionMode = 'none',
  selectedIds = [],
  onSelectionChange,
  readonly = false,
}: MeasurementsWithPaginationTableProps) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { client, location, group } = useUserFilter();

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedMeasurements, setSelectedMeasurements] = useState<
    MeasurementType[]
  >([]);

  const [sort, setSort] = useState<Sort>({
    field: '',
    direction: '',
  });

  const [filters, setFilters] = useState<MeasurementFilter>({
    name: '',
    serialNumber: '',
    timezone: '',
    medium: '',
    type: null,
    levelType: null,
    loadType: null,
    endUseArea: null,
    location: '',
    group: '',
    tenants: '',
  });

  const translationBaseRoute =
    'components.measurement.measurementsWithPaginationTable.';
  const { data: Options } = useGetMetaData({
    locale: user?.language ?? null,
  });
  const translationKey =
    user?.language === 'en' ? 'translationEn' : 'translationPl';

  const { data: measurementData, isLoading } = useGetMeasurementList({
    page: page,
    size: pageSize,
    sort,
    clientUuid: client ? client.uuid : null,
    locationUuid: location ? location.uuid : null,
    groupUuid: group ? group.uuid : null,
    measurementName: filters.name,
    serialNumber: filters.serialNumber,
    medium: filters.medium,
    measurementType: filters.type ? filters.type.name : undefined,
    levelType: filters.levelType ? filters.levelType.name : undefined,
    loadType: filters.loadType ? filters.loadType.name : undefined,
    endUseAreaType: filters.endUseArea ? filters.endUseArea.name : undefined,
    locationName: filters.location,
    groupName: filters.group,
    tenants: filters.tenants,
  });

  const totalCount = measurementData?.meta?.totalItems || 0;

  const handleRowSelect = useCallback(
    (measurement: MeasurementType, checked: boolean) => {
      let updatedSelections: MeasurementType[];

      if (selectionMode === 'single') {
        updatedSelections = checked ? [measurement] : [];
      } else if (selectionMode === 'multiple') {
        if (checked) {
          updatedSelections = [...selectedMeasurements, measurement];
        } else {
          updatedSelections = selectedMeasurements.filter(
            (m) => m.uuid !== measurement.uuid
          );
        }
      } else {
        updatedSelections = [];
      }

      setSelectedMeasurements(updatedSelections);
      onSelectionChange?.(updatedSelections);
    },
    [selectionMode, selectedMeasurements, onSelectionChange]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (selectionMode === 'multiple' && measurementData?.data) {
        const updatedSelections = checked ? measurementData.data : [];
        setSelectedMeasurements(updatedSelections);
        onSelectionChange?.(updatedSelections);
      }
    },
    [selectionMode, measurementData?.data, onSelectionChange]
  );

  const isSelected = useCallback(
    (measurement: MeasurementType) => {
      return (
        selectedMeasurements.some((m) => m.uuid === measurement.uuid) ||
        selectedIds.includes(measurement.uuid)
      );
    },
    [selectedMeasurements, selectedIds]
  );

  const isAllPageSelected = useCallback(() => {
    const currentPageData = measurementData?.data || [];
    return (
      currentPageData.length > 0 &&
      currentPageData.every((item) => isSelected(item))
    );
  }, [measurementData?.data, isSelected]);

  const columns = React.useMemo<ColumnDef<MeasurementType, unknown>[]>(() => {
    const baseColumns: ColumnDef<MeasurementType, unknown>[] = [];

    if (!readonly && selectionMode !== 'none') {
      baseColumns.push({
        id: 'select',
        accessorFn: () => 'select', // Dummy accessor so React Table allows filtering
        header: () => {
          return null;
        },
        cell: ({ row }) => {
          if (selectionMode === 'single') {
            return (
              <Radio
                checked={isSelected(row.original)}
                onChange={(e) =>
                  handleRowSelect(row.original, e.target.checked)
                }
                color="var(--color-rhino-indigo-blue-highlight)"
              />
            );
          } else {
            return (
              <CheckBox
                checked={isSelected(row.original)}
                onChange={(e) =>
                  handleRowSelect(row.original, e.target.checked)
                }
              />
            );
          }
        },
        enableSorting: false,
        enableColumnFilter: selectionMode === 'multiple', // Only show filter for multiple selection
        meta: {
          sortKey: null,
          filterVariant: FilterVariant.SELECT_ALL,
          selectAllChecked: isAllPageSelected(),
          onSelectAll: handleSelectAll,
        },
      });
    }

    baseColumns.push(
      {
        accessorFn: (row) => row.displayName,
        header: t(translationBaseRoute + 'header.name'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'name',
          sortKey: 'name',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.serialNumber,
        header: t(translationBaseRoute + 'header.serialNumber'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'serialNumber',
          sortKey: 'serialNumber',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.timezone,
        header: t(translationBaseRoute + 'header.timezone'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'timezone',
          sortKey: 'timezone',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.translatedMedium,
        header: t(translationBaseRoute + 'header.medium'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'medium',
          sortKey: 'medium',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.type,
        header: t(translationBaseRoute + 'header.type'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'type',
          sortKey: null,
          selectionOptions: ['AUTOMATIC', 'MANUAL', 'VIRTUAL'],
        },
      },
      {
        accessorFn: (row) =>
          row.levelType?.[translationKey as keyof NameWithTranslationDto],
        header: t(translationBaseRoute + 'header.levelType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'levelType',
          sortKey: 'levelType',
          sortDirection: sort.direction,
          selectionOptions: Options?.levelTypes?.map(
            (type) => type[translationKey] ?? ''
          ),
        },
      },
      {
        accessorFn: (row) =>
          row.loadType?.[translationKey as keyof NameWithTranslationDto],
        header: t(translationBaseRoute + 'header.loadType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'loadType',
          sortKey: 'loadType',
          sortDirection: sort.direction,
          selectionOptions: Options?.loadTypes?.map(
            (type) => type[translationKey] ?? ''
          ),
        },
      },
      {
        accessorFn: (row) =>
          row.endUseArea?.[translationKey as keyof NameWithTranslationDto],
        header: t(translationBaseRoute + 'header.endUseArea'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'endUseArea',
          sortKey: 'endUseArea',
          sortDirection: sort.direction,
          selectionOptions: Options?.endUseAreaTypes?.map(
            (type) => type[translationKey] ?? ''
          ),
        },
      },
      {
        accessorFn: (row) => row.locationName,
        header: t(translationBaseRoute + 'header.location'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'location',
          sortKey: 'location',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.groupName,
        header: t(translationBaseRoute + 'header.group'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'group',
          sortKey: 'group',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.tenants,
        header: t(translationBaseRoute + 'header.tenants'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'tenants',
          sortKey: null,
        },
      }
    );

    return baseColumns;
  }, [
    t,
    sort.direction,
    Options,
    selectionMode,
    readonly,
    handleRowSelect,
    handleSelectAll,
    isAllPageSelected,
    isSelected,
    translationKey,
  ]);

  const onSortClick = useCallback((field: string, direction: string) => {
    setSort({ field, direction });
  }, []);

  const onFilterChange = useCallback(
    (val: string | null, field: string, variant: FilterVariant | null) => {
      switch (variant) {
        case FilterVariant.TEXT:
          setFilters((prev) => ({ ...prev, [field]: val }));
          break;
        case FilterVariant.SELECT: {
          if (field === 'type') {
            setFilters((prev: MeasurementFilter) => ({
              ...prev,
              [field]: val
                ? { name: val, translationEn: val, translationPl: val }
                : null,
            }));
          } else {
            const selectedType =
              Options?.levelTypes?.find(
                (type) => type[translationKey] === val
              ) ||
              Options?.loadTypes?.find(
                (type) => type[translationKey] === val
              ) ||
              Options?.endUseAreaTypes?.find(
                (type) => type[translationKey] === val
              );

            setFilters((prev: MeasurementFilter) => ({
              ...prev,
              [field]: selectedType || null,
            }));
          }
          break;
        }
        case null:
          setFilters({
            name: '',
            serialNumber: '',
            timezone: '',
            medium: '',
            type: null,
            levelType: null,
            loadType: null,
            endUseArea: null,
            location: '',
            group: '',
            tenants: '',
          });
      }
    },
    [Options, translationKey]
  );

  return (
    <div>
      {selectionMode !== 'none' && !readonly && (
        <div className="p-5">
          <span className="text-sm text-gray-600">
            {t(translationBaseRoute + 'selectedText')}:{' '}
            {selectedMeasurements.length + selectedIds.length}
          </span>
        </div>
      )}
      <div className="relative flex-grow flex-shrink basis-auto p-[1.25rem] overflow-auto [&>div]:justify-between">
        <Table
          columns={columns}
          data={measurementData?.data || []}
          footer={{
            currentPage: page,
            totalCount: totalCount,
            setCurrentPage: setPage,
            setPageSize: setPageSize,
            pageSize: pageSize,
          }}
          emptyText={t(translationBaseRoute + 'emptyText')}
          onSortSelect={onSortClick}
          onFilterChange={onFilterChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default MeasurementsWithPaginationTable;
