import { DashboardType, Filter, Sort } from './types';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useGetOptions, useGetTableData } from './api';
import ActionCell from '../../components/shared/Table/ActionCell';
import { ColumnDef } from '@tanstack/react-table';
import IconButton from '../../components/shared/Buttons/IconButton';
import MainLayout from '../../layouts/MainLayout';
import Table from '../../components/shared/Table';
import Title from '../../components/shared/Title';
import { UserType } from '../../api/User/types';
import { VITE_WICKET_BASE_URL } from '../../components/shared/Sidebar/data';
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

  const { data: tableData, isLoading } = useGetTableData({
    requestBody: {
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
        user?.structureAccess?.resourceAccesses &&
        user?.userType === UserType.LocalisationAdmin
          ? user.structureAccess.resourceAccesses
              .filter((resource) => resource.source_type === 'LOCALISATION')
              .map((resource) => resource.source_uuid)
          : [],
    },
    queryKeys: [
      page,
      pageSize,
      client,
      group,
      location,
      JSON.stringify(filters),
      JSON.stringify(sort),
      favoriteMeter,
    ],
    user,
  });

  const { data: Options } = useGetOptions({
    locale: user?.language ? user.language : null,
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
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'localisationName',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
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
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'groupName',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
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
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'measurementName',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
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
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'serialNumber',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
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
          isSortable: false,
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
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'translatedMedium',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.factor,
        header: t(translationBaseRoute + 'header.factor'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'factor',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.value,
        header: t(translationBaseRoute + 'header.value'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'value',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.readTime,
        header: t(translationBaseRoute + 'header.readTime'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'readTime',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.currentMonthConsumption,
        header: t(translationBaseRoute + 'header.currentMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'currentMonthConsumption',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.lastMonthSameDayConsumption,
        header: t(translationBaseRoute + 'header.lastMonthSameDayConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'lastMonthSameDayConsumption',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.percentage,
        header: t(translationBaseRoute + 'header.percentage'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'percentage',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.lastMonthConsumption,
        header: t(translationBaseRoute + 'header.lastMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'lastMonthConsumption',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.unit,
        header: t(translationBaseRoute + 'header.unit'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'unit',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.levelType?.translationEn,
        header: t(translationBaseRoute + 'header.levelType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'levelType',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
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
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'loadType',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
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
          isSortable: true,
          setSortedField: (val) => {
            setSort((prev) => {
              return { ...prev, field: val as string };
            });
          },
          sortKey: 'endUseArea',
          setSortDirection: (val) => {
            setSort((prev) => {
              return { ...prev, direction: val as string };
            });
          },
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
          isSortable: false,
        },
        cell: ({ row }) => (
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
        ),
      },
    ],
    [Options, sort.direction, t]
  );

  return (
    <MainLayout>
      <Title
        title={t('pages.dashboard.mainHeader')}
        guide={true}
        guideLink="https://rhino.energy/wp-content/uploads/2023/04/Rhino-Platform-Access-nawigation-Dashboard-20230420.pdf"
      />
      <p className="text-[15px] text-[#666666] mb-2 mt-[19px]">
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
        isLoading={isLoading}
      />
    </MainLayout>
  );
};

export default Dashboard;
