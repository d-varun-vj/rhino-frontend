import { ColumnDef, Row } from '@tanstack/react-table';
import {
  DashboardType,
  Filter,
  VITE_WICKET_BASE_URL,
  useGetMetaData,
  useGetTableData,
} from '@rhino/apis';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import React, { useCallback, useEffect, useState } from 'react';

import ActionCell from '../../components/Table/ActionCell';
import { CONSTANTS } from '../../constant';
import { FilterVariant } from '../../components/Table/types';
import IconButton from '../../components/Buttons/IconButton';
import MainLayout from '../../layouts/MainLayout';
import PageTitle from '../../components/PageTitle';
import { convertToLocalTime, Sort } from '@rhino/utils';
import Table from '../../components/Table';
import { format } from 'date-fns';
import { getRibbonParams } from '../../helpers/topribbon';
import { shouldSetInitialClient } from '../../helpers/client';
import { useFavoriteMeter } from '../../context/favoriteMeter';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user';
import { useUserFilter } from '../../context/userFilter';
import { GUIDE_LINKS } from '../../constant/guide-links';

type ColorMap = {
  [key: string]: string;
};

const PERCENTAGE_COLORS: ColorMap = {
  GREEN: 'text-green-500',
  BLUE: 'text-blue-500',
  ORANGE: 'text-orange-500',
  RED: 'text-red-500',
  DEFAULT: 'text-black',
};

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

  const { data: DashboardDataRes, isLoading: isLoadingTableData } =
    useGetTableData({
      params: {
        page: page,
        size: pageSize,
        clientUuid: client ? client.uuid : null,
        locationUuid: location ? location.uuid : null,
        groupUuid: group ? group.uuid : null,
        sort: sort,
        ...filters,
        favoriteMeterUuid: favoriteMeter ? favoriteMeter.uuid : null,
      },
    });

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
              'consumptionProfileChart' +
              getRibbonParams({ client, location, group }) +
              `&uuid=${row.original.id}&incremental=${row.original.incremental}&type=${row.original.type}&shouldCompareMeasurement=${false}`;
          }}
          popupContent={t(translationBaseRoute + 'popup.goToProfile')}
          style="bg-rhino-energy-green text-rhino-white"
          dataTestId="consumption-profile-chart-btn"
        >
          <FaChartBar />
        </IconButton>
        <IconButton
          action={() => {
            window.location.href =
              VITE_WICKET_BASE_URL +
              'consumptionChart' +
              getRibbonParams({ client, location, group }) +
              `&uuid=${row.original.id}&incremental=${row.original.incremental}&type=${row.original.type}&shouldCompareMeasurement=${true}`;
          }}
          popupContent={t(translationBaseRoute + 'popup.goToComsumptions')}
          style="bg-rhino-energy-green text-rhino-white"
          dataTestId="consumption-chart-btn"
        >
          <FaChartLine />
        </IconButton>
      </ActionCell>
    ),
    [t, client, location, group]
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
        id: 'location-name',
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
        id: 'group-name',
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
        id: 'measurement-name',
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
        id: 'serial-number',
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
        id: 'tenant',
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
        id: 'translated-medium',
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
        id: 'factor',
        accessorFn: (row) => row.factor,
        header: t(translationBaseRoute + 'header.factor'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'factor',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'value',
        accessorFn: (row) => row.value,
        header: t(translationBaseRoute + 'header.value'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'value',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'read-time',
        accessorFn: (row) => row.readTime,
        header: t(translationBaseRoute + 'header.readTime'),
        cell: (info) => {
          if (info.row.original.readTime) {
            return format(
              convertToLocalTime(info.row.original.readTime),
              'dd-MM-yyyy HH:mm'
            );
          }
          return info.getValue();
        },
        meta: {
          sortKey: 'readTime',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'current-month-consumption',
        accessorFn: (row) => row.currentMonthConsumption,
        header: t(translationBaseRoute + 'header.currentMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'currentMonthConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'last-month-same-day-consumption',
        accessorFn: (row) => row.lastMonthSameDayConsumption,
        header: t(translationBaseRoute + 'header.lastMonthSameDayConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'lastMonthSameDayConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'percentage',
        accessorFn: (row) => row.percentage,
        header: t(translationBaseRoute + 'header.percentage'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'percentage',
          sortDirection: sort.direction,
          renderCell: (value, row) => {
            const color = (row as DashboardType)
              .percentageColor as keyof typeof PERCENTAGE_COLORS;
            const className =
              PERCENTAGE_COLORS[color] || PERCENTAGE_COLORS.DEFAULT;
            return <span className={className}>{String(value)}</span>;
          },
        },
      },
      {
        id: 'last-month-consumption',
        accessorFn: (row) => row.lastMonthConsumption,
        header: t(translationBaseRoute + 'header.lastMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'lastMonthConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'unit',
        accessorFn: (row) => row.unit,
        header: t(translationBaseRoute + 'header.unit'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'unit',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'level-type',
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
        id: 'load-type',
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
        id: 'end-use-area',
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
        guideLink={GUIDE_LINKS.DASHBOARD}
        dataTestId="dashboard-page-header"
      />
      <p
        className="text-[15px] text-grey-dark mb-2 mt-[19px]"
        data-testid="dashboard-page-subheader"
      >
        {t('pages.dashboard.subHeader')}
      </p>
      <Table
        columns={columns}
        data={DashboardDataRes ? DashboardDataRes?.content : []}
        footer={{
          currentPage: page,
          totalCount: DashboardDataRes ? DashboardDataRes?.totalElements : 0,
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
