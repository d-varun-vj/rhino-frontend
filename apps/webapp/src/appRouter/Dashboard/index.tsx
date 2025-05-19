import { DashboardType, Filter } from './types';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { TableData, useGetMetaData, usePostGetTableData } from './api';
import ActionCell from '../../components/shared/Table/ActionCell';
import { ColumnDef, Row } from '@tanstack/react-table';
import IconButton from '../../components/shared/Buttons/IconButton';
import MainLayout from '../../layouts/MainLayout';
import Table from '../../components/shared/Table';
import Title from '../../components/shared/Title';
import { VITE_WICKET_BASE_URL } from '../../components/shared/Sidebar/config';
import { useFavoriteMeter } from '../../context/useFavoriteMeter';
import { useFilter } from '../../context/useFilter';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/useUser';
import { FilterVariant } from '../../components/shared/Table/types';
import { Sort } from '../../types/shared/table';
import { shouldSetInitialClient } from '../../helpers/client';
import { CONSTANTS } from '../../constant';

const Dashboard = () => {
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
  const { client, location, group, setClient } = useFilter();
  const { favoriteMeter } = useFavoriteMeter();
  const { user } = useUser();
  const { t } = useTranslation();
  const translationBaseRoute = 'pages.dashboard.table.';

  const { mutateAsync: postGetTableData, isPending } = usePostGetTableData({
    params: {
      page: page,
      size: pageSize,
      clientId: client ? client.uuid : null,
      locationUuid: location ? location.uuid : null,
      groupUuid: group ? group.uuid : null,
      sortDirection: sort.direction,
      sortedField: sort.field,
      ...filters,
      measurementUuids: favoriteMeter
        ? favoriteMeter.measurementUuids
        : user?.measurements
          ? user.measurements
          : null,
    },
  });
  const [tableData, settableData] = useState<TableData>();

  const getData = async () => {
    const resonse = await postGetTableData();
    settableData(resonse);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user,
    client,
    location,
    group,
    favoriteMeter,
    filters,
    sort,
    page,
    pageSize,
  ]);

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

  const ActionCellFn = (row: Row<DashboardType>) => (
    <ActionCell>
      <IconButton
        action={() => {
          window.location.href =
            VITE_WICKET_BASE_URL +
            `consumptionProfileChart?uuid=${row.original.id}&incremental=${row.original.incremental}&type=${row.original.type}`;
        }}
        popupContent={t(translationBaseRoute + 'popup.goToProfile')}
        style="bg-rhino-energy-green text-white"
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
        style="bg-rhino-energy-green text-white"
      >
        <FaChartLine />
      </IconButton>
    </ActionCell>
  );

  const onSortClick = (field: string, direction: string) => {
    setSort({ field, direction });
  };

  const onFilterChange = (
    val: string | null,
    field: string,
    filterVarient: FilterVariant | null
  ) => {
    switch (filterVarient) {
      case FilterVariant.TEXT:
        setFilters((prev: Filter) => {
          return { ...prev, [field]: val };
        });
        break;
      case FilterVariant.SELECT:
        if (val === null) {
          setFilters((prev: Filter) => {
            return { ...prev, [field]: '' };
          });
        }
        Options?.levelTypes.filter((type) => {
          if (type.translationEn === val) {
            setFilters((prev: Filter) => {
              return { ...prev, [field]: type.name };
            });
          }
        });
        break;
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
          sortKey: 'translatedMedium',
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
        accessorFn: (row) => row.value,
        header: t(translationBaseRoute + 'header.value'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'value',
          sortDirection: sort.direction,
        },
      },
      {
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
          filterKey: 'endUserAreaType',
          sortKey: 'endUseArea',
          sortDirection: sort.direction,
          selectionOptions: Options?.endUserAreaTypes.map(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Options, sort.direction, t]
  );

  return (
    <MainLayout>
      <Title
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
        isLoading={isPending}
      />
    </MainLayout>
  );
};

export default Dashboard;
