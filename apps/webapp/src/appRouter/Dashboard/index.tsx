import { DashboardType, Filter, Sort } from './types';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { TableData, useGetMetaData, usePostGetTableData } from './api';
import ActionCell from '../../components/shared/Table/ActionCell';
import { ColumnDef, Row } from '@tanstack/react-table';
import IconButton from '../../components/shared/Buttons/IconButton';
import MainLayout from '../../layouts/MainLayout';
import Table from '../../components/shared/Table';
import Title from '../../components/shared/Title';
import { UserType } from '../../api/User/types';
import { VITE_WICKET_BASE_URL } from '../../components/shared/Sidebar/config';
import { useFavoriteMeter } from '../../context/useFavoriteMeter';
import { useFilter } from '../../context/useFilter';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/useUser';

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
    endUserAreaType: null,
  });
  const [sort, setSort] = useState<Sort>({
    field: '',
    direction: '',
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // const [pagination, setPagination] = useState({
  //   page: 0,
  //   pageSize: 5,
  // });

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
      sortDirection: sort.direction ? sort.direction : null,
      sortedField: sort.field ? sort.field : null,
      ...filters,
      measurementUuids: favoriteMeter
        ? favoriteMeter.measurementUuids
        : user?.measurements
          ? user.measurements
          : null,
      clientUuids:
        favoriteMeter === null && user?.clients
          ? user.clients?.map((client) => client.uuid)
          : [],
      localisationUuids:
        favoriteMeter === null &&
        user?.structureAccess?.resourceAccesses &&
        user?.userType === UserType.LocalisationAdmin
          ? user.structureAccess.resourceAccesses
              .filter((resource) => resource.source_type === 'LOCALISATION')
              .map((resource) => resource.source_uuid)
          : [],
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
    if (
      (user && user.userType === UserType.ClientAdmin) ||
      user?.userType === UserType.LocalisationAdmin ||
      user?.userType === UserType.RegularUser ||
      user?.userType === UserType.Tenant
    ) {
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

  const columns = React.useMemo<ColumnDef<DashboardType, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.localisationName,
        header: t(translationBaseRoute + 'header.localisationName'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: (val: string) => {
            setFilters((prev: Filter) => {
              return { ...prev, locationName: val };
            });
          },
          sortKey: 'localisationName',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.groupName,
        header: t(translationBaseRoute + 'header.groupName'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: (val: string) => {
            setFilters((prev: Filter) => {
              return { ...prev, groupName: val };
            });
          },
          sortKey: 'groupName',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.measurementName,
        header: t(translationBaseRoute + 'header.measurementName'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: (val: string) => {
            setFilters((prev: Filter) => {
              return { ...prev, measurementName: val };
            });
          },
          sortKey: 'measurementName',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.serialNumber,
        header: t(translationBaseRoute + 'header.serialNumber'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: (val: string) => {
            setFilters((prev: Filter) => {
              return { ...prev, serialNumber: val };
            });
          },
          sortKey: 'serialNumber',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.tenant,
        header: t(translationBaseRoute + 'header.tenant'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: (val: string) => {
            setFilters((prev: Filter) => {
              return { ...prev, tenant: val };
            });
          },
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.translatedMedium,
        header: t(translationBaseRoute + 'header.translatedMedium'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: (val: string) => {
            setFilters((prev: Filter) => {
              return { ...prev, medium: val };
            });
          },
          sortKey: 'translatedMedium',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.factor,
        header: t(translationBaseRoute + 'header.factor'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          sortKey: 'factor',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.value,
        header: t(translationBaseRoute + 'header.value'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          sortKey: 'value',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.readTime,
        header: t(translationBaseRoute + 'header.readTime'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          sortKey: 'readTime',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.currentMonthConsumption,
        header: t(translationBaseRoute + 'header.currentMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          sortKey: 'currentMonthConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.lastMonthSameDayConsumption,
        header: t(translationBaseRoute + 'header.lastMonthSameDayConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          sortKey: 'lastMonthSameDayConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.percentage,
        header: t(translationBaseRoute + 'header.percentage'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          sortKey: 'percentage',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.lastMonthConsumption,
        header: t(translationBaseRoute + 'header.lastMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          sortKey: 'lastMonthConsumption',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.unit,
        header: t(translationBaseRoute + 'header.unit'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          sortKey: 'unit',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.levelType?.translationEn,
        header: t(translationBaseRoute + 'header.levelType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          sortKey: 'levelType',
          sortDirection: sort.direction,
          selectionOptions: Options?.levelTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilters((prev: Filter) => {
                return { ...prev, levelType: '' };
              });
            }
            Options?.levelTypes.filter((type) => {
              if (type.translationEn === value) {
                setFilters((prev: Filter) => {
                  return { ...prev, levelType: type.name };
                });
              }
            });
          },
        },
      },
      {
        accessorFn: (row) => row.loadType?.translationEn,
        header: t(translationBaseRoute + 'header.loadType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          sortKey: 'loadType',
          sortDirection: sort.direction,
          selectionOptions: Options?.loadTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilters((prev: Filter) => {
                return { ...prev, loadType: '' };
              });
            }
            Options?.loadTypes.filter((type) => {
              if (type.translationEn === value) {
                setFilters((prev: Filter) => {
                  return { ...prev, loadType: type.name };
                });
              }
            });
          },
        },
      },
      {
        accessorFn: (row) => row.endUseArea?.translationEn,
        header: t(translationBaseRoute + 'header.endUseArea'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          sortKey: 'endUseArea',
          sortDirection: sort.direction,
          selectionOptions: Options?.endUserAreaTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilters((prev: Filter) => {
                return { ...prev, endUserAreaType: '' };
              });
            }
            Options?.endUserAreaTypes.filter((type) => {
              if (type.translationEn === value) {
                setFilters((prev: Filter) => {
                  return { ...prev, endUserAreaType: type.name };
                });
              }
            });
          },
        },
      },
      {
        id: 'action',
        accessorFn: (row) => row.action,
        header: t(translationBaseRoute + 'header.actions'),
        meta: {
          filterVariant: null,
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
        data={tableData ? tableData?.results : []}
        footer={{
          currentPage: page,
          totalCount: tableData ? tableData?.totalCount : 0,
          setCurrentPage: setPage,
          setPageSize: setPageSize,
          pageSize: pageSize,
        }}
        onSortSelect={onSortClick}
        isLoading={isPending}
      />
    </MainLayout>
  );
};

export default Dashboard;
