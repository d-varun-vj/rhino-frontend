import { FaChartBar, FaChartLine } from 'react-icons/fa';
import React, { useCallback, useEffect, useState } from 'react';
import ActionCell from '../../components/Table/ActionCell';
import { ColumnDef, Row } from '@tanstack/react-table';
import IconButton from '../../components/Buttons/IconButton';
import MainLayout from '../../layouts/MainLayout';
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { useFavoriteMeter } from '../../context/favoriteMeter';
import { useUserFilter } from '../../context/userFilter';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user';
import { FilterVariant } from '../../components/Table/types';
import { Sort } from '@rhino/utils';
import { shouldSetInitialClient } from '../../helpers/client';
import { CONSTANTS } from '../../constant';
import {
  DashboardType,
  Filter,
  TableData,
  useGetMetaData,
  useGetTableData,
  VITE_WICKET_BASE_URL,
} from '@rhino/apis';

export const Dashboard = () => {
  const [filters, setFilters] = useState<Filter>({
    locationName: null,
    groupName: null,
    measurementName: null,
    serialNumber: null,
    tenant: null,
    medium: null,
    levelType: null,
    loadType: null,
    endUseAreaType: null,
  });
  const [sort, setSort] = useState<Sort>({
    field: '',
    direction: '',
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { client, location, group, setClient } = useUserFilter();
  const { favoriteMeter } = useFavoriteMeter();
  const { user } = useUser();
  const { t } = useTranslation();
  const translationBaseRoute = 'pages.dashboard.table.';

  const { data: getTableData, isLoading: isLoadingTableData } = useGetTableData(
    {
      params: {
        page: page,
        size: pageSize,
        clientUuid: client ? client.uuid : null,
        locationUuid: location ? location.uuid : null,
        groupUuid: group ? group.uuid : null,
        sortDirection: sort.direction,
        sortedField: sort.field,
        ...filters,
        favoriteMeterUuid: favoriteMeter ? favoriteMeter.uuid : null,
      },
    }
  );
  const [tableData, setTableData] = useState<TableData>();

  useEffect(() => {
    const getData = () => {
      try {
        setTableData(getTableData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [getTableData]);

  const { data: Options } = useGetMetaData({
    locale: user?.language ?? null,
  });

  useEffect(() => {
    if (user && shouldSetInitialClient(user)) {
      setClient({
        name: user.clients ? user.clients[0].name : '',
        uuid: user.clients ? user.clients[0].uuid : '',
      });
    }
  }, [user, setClient]);

  const ActionCellFn = useCallback(
    (row: Row<DashboardType>) => (
      <ActionCell>
        <IconButton
          action={() => {
            window.location.href =
              VITE_WICKET_BASE_URL +
              `consumptionProfileChart?uuid=${row.original.id}&incremental=${row.original.incremental}&type=${row.original.type}`;
          }}
          popupContent={t(translationBaseRoute + 'popup.goToProfile')}
          style="bg-rhino-energy-green text-rhino-white"
        >
          <FaChartBar />
        </IconButton>
        <IconButton
          action={() => {
            window.location.href =
              VITE_WICKET_BASE_URL +
              `consumptionChart?uuid=${row.original.id}&incremental=${row.original.incremental}&type=${row.original.type}`;
          }}
          popupContent={t(translationBaseRoute + 'popup.goToComsumptions')}
          style="bg-rhino-energy-green text-rhino-white"
        >
          <FaChartLine />
        </IconButton>
      </ActionCell>
    ),
    [t]
  );

  const onSortClick = (field: string, direction: string) => {
    setSort({ field, direction });
  };

  const onFilterChange = (
    val: string | null,
    field: string,
    filterVariant: FilterVariant | null
  ) => {
    switch (filterVariant) {
      case FilterVariant.TEXT:
        setFilters((prev: Filter) => {
          return { ...prev, [field]: val };
        });
        break;
      case FilterVariant.SELECT: {
        const selectedType =
          Options?.levelTypes.find((type) => type.translationEn === val) ||
          Options?.loadTypes.find((type) => type.translationEn === val) ||
          Options?.endUseAreaTypes.find((type) => type.translationEn === val);

        setFilters((prev: Filter) => ({
          ...prev,
          [field]: selectedType
            ? selectedType.name
            : prev[field as keyof Filter],
        }));
        break;
      }
      case null:
        setFilters({
          locationName: null,
          groupName: null,
          measurementName: null,
          serialNumber: null,
          tenant: null,
          medium: null,
          levelType: null,
          loadType: null,
          endUseAreaType: null,
        });
    }
  };

  const columns = React.useMemo<ColumnDef<DashboardType, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.localisationName,
        header: t(translationBaseRoute + 'header.localisationName'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'locationName',
          sortKey: 'localisationName',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.groupName,
        header: t(translationBaseRoute + 'header.groupName'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'groupName',
          sortKey: 'groupName',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.measurementName,
        header: t(translationBaseRoute + 'header.measurementName'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'measurementName',
          sortKey: 'measurementName',
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
        accessorFn: (row) => row.tenant,
        header: t(translationBaseRoute + 'header.tenant'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'tenant',
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.translatedMedium,
        header: t(translationBaseRoute + 'header.translatedMedium'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'medium',
          sortKey: user?.language == 'en' ? 'mediumEn' : 'mediumPl',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.factor,
        header: t(translationBaseRoute + 'header.factor'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'factor',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'VALUE',
        accessorFn: (row) => row.value,
        header: t(translationBaseRoute + 'header.value'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'value',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'READ_TIME',
        accessorFn: (row) => row.readTime,
        header: t(translationBaseRoute + 'header.readTime'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'readTime',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.currentMonthConsumption,
        header: t(translationBaseRoute + 'header.currentMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'currentMonthConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.lastMonthSameDayConsumption,
        header: t(translationBaseRoute + 'header.lastMonthSameDayConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'lastMonthSameDayConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.percentage,
        header: t(translationBaseRoute + 'header.percentage'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'percentage',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.lastMonthConsumption,
        header: t(translationBaseRoute + 'header.lastMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'lastMonthConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.unit,
        header: t(translationBaseRoute + 'header.unit'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'unit',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.levelType?.translationEn,
        header: t(translationBaseRoute + 'header.levelType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'levelType',
          sortKey: 'levelType',
          sortDirection: sort.direction,
          selectionOptions: Options?.levelTypes.map(
            (type) => type.translationEn
          ),
        },
      },
      {
        accessorFn: (row) => row.loadType?.translationEn,
        header: t(translationBaseRoute + 'header.loadType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'loadType',
          sortKey: 'loadType',
          sortDirection: sort.direction,
          selectionOptions: Options?.loadTypes.map(
            (type) => type.translationEn
          ),
        },
      },
      {
        accessorFn: (row) => row.endUseArea?.translationEn,
        header: t(translationBaseRoute + 'header.endUseArea'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'endUseAreaType',
          sortKey: 'endUseArea',
          sortDirection: sort.direction,
          selectionOptions: Options?.endUseAreaTypes?.map(
            (type) => type.translationEn
          ),
        },
      },
      {
        id: CONSTANTS.action,
        accessorFn: (row) => row.action,
        header: t(translationBaseRoute + 'header.actions'),
        meta: {
          sortKey: null,
        },
        cell: ({ row }) => ActionCellFn(row),
      },
    ],
    [
      ActionCellFn,
      Options?.endUseAreaTypes,
      Options?.levelTypes,
      Options?.loadTypes,
      sort.direction,
      t,
      user?.language,
    ]
  );

  return (
    <MainLayout title="sideMenu.dashboard">
      <PageTitle
        title={t('pages.dashboard.mainHeader')}
        guide={true}
        guideLink="https://rhino.energy/wp-content/uploads/2023/04/Rhino-Platform-Access-nawigation-Dashboard-20230420.pdf"
      />
      <p className="text-[15px] text-grey mb-2 mt-[19px]">
        {t('pages.dashboard.subHeader')}
      </p>
      <Table
        columns={columns}
        data={tableData ? tableData?.content : []}
        footer={{
          currentPage: page,
          totalCount: tableData ? tableData?.totalElements : 0,
          setCurrentPage: setPage,
          setPageSize: setPageSize,
          pageSize: pageSize,
        }}
        onSortSelect={onSortClick}
        onFilterChange={onFilterChange}
        isLoading={isLoadingTableData}
      />
    </MainLayout>
  );
};
