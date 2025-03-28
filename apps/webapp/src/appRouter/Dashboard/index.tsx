import React, { useState } from 'react';

import Title from '../../components/shared/Title';
import MainLayout from '../../layouts/MainLayout';
import { ColumnDef } from '@tanstack/react-table';
import { DashboardType } from './types';
import IconButton from '../../components/shared/Buttons/IconButton';
import { FaChartBar, FaChartLine } from 'react-icons/fa';

import { getTableData } from './api';
import { useQuery } from '@tanstack/react-query';
import { useFilter } from '../../context/useFilter';
import { DATA_QUERY_KEYS } from '../../api/data-query-keys';
import Table from '../../components/shared/Table';
import ActionCell from '../../components/shared/Table/ActionCell';
import { VITE_WICKET_BASE_URL } from '../../components/shared/Sidebar/data';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const [filterLocation, setFilterLocation] = useState<string>();
  const [filterGroup, setFilterGroup] = useState<string>();
  const [filterMeasurement, setFilterMeasurement] = useState<string>();
  const [filterSerialNumber, setFilterSerialNumber] = useState<string>();
  const [filterTenant, setFilterTenant] = useState<string>();
  const [filterMedium, setFilterMedium] = useState<string>();
  const [filterLevelType, setFilterLevelType] = useState<string>();
  const [filterLoadType, setFilterLoadType] = useState<string>();
  const [filterEndUseAreaType, setFilterEndUseAreaType] = useState<string>();
  const [sortedField, setSortedField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('');

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { client, location, group } = useFilter();
  const { t } = useTranslation();
  const translationBaseRoute = 'pages.dashboard.table.header.';

  const { data: tableData, isLoading } = useQuery({
    queryKey: [
      ...DATA_QUERY_KEYS.getDashboard(),
      page,
      pageSize,
      client,
      group,
      location,
      filterLocation,
      filterGroup,
      filterMeasurement,
      filterSerialNumber,
      filterTenant,
      filterMedium,
      filterLevelType,
      filterLoadType,
      filterEndUseAreaType,
      sortedField,
      sortDirection,
    ],
    queryFn: () =>
      getTableData({
        page: page,
        size: pageSize,
        clientId: client ? client.uuid : null,
        locationUuid: location ? location.uuid : null,
        groupUuid: group ? group.uuid : null,
        locationName: filterLocation ? filterLocation : null,
        groupName: filterGroup ? filterGroup : null,
        measurementName: filterMeasurement ? filterMeasurement : null,
        serialNumber: filterSerialNumber ? filterSerialNumber : null,
        tenant: filterTenant ? filterTenant : null,
        medium: filterMedium ? filterMedium : null,
        levelType: filterLevelType ? filterLevelType : null,
        loadType: filterLoadType ? filterLoadType : null,
        endUserAreaType: filterEndUseAreaType ? filterEndUseAreaType : null,
        sortedField: sortedField ? sortedField : null,
        sortDirection: sortDirection ? sortDirection : null,
      }),
  });

  const columns = React.useMemo<ColumnDef<DashboardType, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.localisationName,
        header: t(translationBaseRoute + 'localisationName'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterLocation,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'localisationName',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.groupName,
        header: t(translationBaseRoute + 'groupName'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterGroup,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'groupName',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.measurementName,
        header: t(translationBaseRoute + 'measurementName'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterMeasurement,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'measurementName',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.serialNumber,
        header: t(translationBaseRoute + 'serialNumber'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterSerialNumber,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'serialNumber',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.tenant,
        header: t(translationBaseRoute + 'tenant'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterTenant,
          isSortable: false,
        },
      },
      {
        accessorFn: (row) => row.translatedMedium,
        header: t(translationBaseRoute + 'translatedMedium'),
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterMedium,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'translatedMedium',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.factor,
        header: t(translationBaseRoute + 'factor'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'factor',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.value,
        header: t(translationBaseRoute + 'value'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'value',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.readTime,
        header: t(translationBaseRoute + 'readTime'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'readTime',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.currentMonthConsumption,
        header: t(translationBaseRoute + 'currentMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'currentMonthConsumption',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.lastMonthSameDayConsumption,
        header: t(translationBaseRoute + 'lastMonthSameDayConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'lastMonthSameDayConsumption',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.percentage,
        header: t(translationBaseRoute + 'percentage'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'percentage',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.lastMonthConsumption,
        header: t(translationBaseRoute + 'lastMonthConsumption'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'lastMonthConsumption',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.unit,
        header: t(translationBaseRoute + 'unit'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'unit',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
        },
      },
      {
        accessorFn: (row) => row.levelType?.translationEn,
        header: t(translationBaseRoute + 'levelType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'levelType',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
          selectionOptions: tableData?.options?.levelTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilterLevelType('');
            }
            tableData?.options?.levelTypes.filter((type) => {
              if (type.translationEn === value) {
                setFilterLevelType(type.name);
              }
            });
          },
        },
      },
      {
        accessorFn: (row) => row.loadType?.translationEn,
        header: t(translationBaseRoute + 'loadType'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'loadType',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
          selectionOptions: tableData?.options?.loadTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilterLoadType('');
            }
            tableData?.options?.loadTypes.filter((type) => {
              if (type.translationEn === value) {
                setFilterLoadType(type.name);
              }
            });
          },
        },
      },
      {
        accessorFn: (row) => row.endUseArea?.translationEn,
        header: t(translationBaseRoute + 'endUseArea'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'endUseArea',
          setSortDirection: setSortDirection,
          sortDirection: sortDirection,
          selectionOptions: tableData?.options?.endUserAreaTypes.map(
            (type) => type.translationEn
          ),
          setFilterValue: (value: string) => {
            if (value === null) {
              return setFilterEndUseAreaType('');
            }
            tableData?.options?.endUserAreaTypes.filter((type) => {
              if (type.translationEn === value) {
                setFilterEndUseAreaType(type.name);
              }
            });
          },
        },
      },
      {
        id: 'action',
        accessorFn: (row) => row.action,
        header: t(translationBaseRoute + 'actions'),
        meta: {
          filterVariant: null,
          isSortable: false,
        },
        cell: ({ row }) => (
          <ActionCell>
            <IconButton
              action={() => {
                window.location.href =
                  VITE_WICKET_BASE_URL + 'consumptionProfileChart';
              }}
              popupContent="Go to profile"
              style="bg-rhino-energy-green text-white"
            >
              <FaChartBar />
            </IconButton>
            <IconButton
              action={() => {
                console.log(row.original);
                window.location.href =
                  VITE_WICKET_BASE_URL + 'consumptionChart';
              }}
              popupContent="Go to comsumptions to compare measurement comsumptions"
              style="bg-rhino-energy-green text-white"
            >
              <FaChartLine />
            </IconButton>
          </ActionCell>
        ),
      },
    ],
    [tableData, sortDirection, t]
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
