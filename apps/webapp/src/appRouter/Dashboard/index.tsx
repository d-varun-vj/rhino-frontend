import React, { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import IconButton from '../../components/shared/Buttons/IconButton';
import Title from '../../components/shared/Title';
import MainLayout from '../../layouts/MainLayout';
import { DashboardType, Filter, Sort } from './types';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DATA_QUERY_KEYS } from '../../api/data-query-keys';
import { VITE_WICKET_BASE_URL } from '../../components/shared/Sidebar/data';
import Table from '../../components/shared/Table';
import ActionCell from '../../components/shared/Table/ActionCell';
import { useFilter } from '../../context/useFilter';
import { getTableData } from './api';
import { useFavoriteMeter } from '../../context/useFavoriteMeter';

const Dashboard = () => {
  const [filters, setFilters] = useState<Filter>({
    locationName: '',
    groupName: '',
    measurementName: '',
    serialNumber: '',
    tenant: '',
    medium: '',
    levelType: '',
    loadType: '',
    endUserAreaType: '',
  });
  const [sort, setSort] = useState<Sort>({
    field: '',
    direction: '',
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { client, location, group } = useFilter();
  const { favoriteMeter } = useFavoriteMeter();
  const { t } = useTranslation();
  const translationBaseRoute = 'pages.dashboard.table.';

  const { data: tableData, isLoading } = useQuery({
    queryKey: [
      ...DATA_QUERY_KEYS.getDashboard(),
      page,
      pageSize,
      client,
      group,
      location,
      ...Object.entries(filters).map(([key, value]) => ({ [key]: value })),
      ...Object.entries(sort).map(([key, value]) => ({ [key]: value })),
      favoriteMeter,
    ],
    queryFn: () =>
      getTableData({
        page: page,
        size: pageSize,
        clientId: client ? client.uuid : null,
        locationUuid: location ? location.uuid : null,
        groupUuid: group ? group.uuid : null,
        filters: filters,
        sort: sort,
        measurementUuids: favoriteMeter ? favoriteMeter.measurementUuids : [],
      }),
  });

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
          selectionOptions: tableData?.options?.levelTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilters((prev: Filter) => {
                return { ...prev, levelType: '' };
              });
            }
            tableData?.options?.levelTypes.filter((type) => {
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
          selectionOptions: tableData?.options?.loadTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilters((prev: Filter) => {
                return { ...prev, loadType: '' };
              });
            }
            tableData?.options?.loadTypes.filter((type) => {
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
          selectionOptions: tableData?.options?.endUserAreaTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilters((prev: Filter) => {
                return { ...prev, endUserAreaType: '' };
              });
            }
            tableData?.options?.endUserAreaTypes.filter((type) => {
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
                console.log(row.original);
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
    [tableData, sort.direction, t]
  );
  return (
    <MainLayout>
      <Title title={t('pages.dashboard.mainHeader')} />
      <p className="text-[15px] text-[#666666] mb-[8px] mt-[19px]">
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
