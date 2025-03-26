import React, { useEffect, useState } from 'react';

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

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { client, location, group } = useFilter();

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
      }),
  });

  const columns = React.useMemo<ColumnDef<DashboardType, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.localisationName,
        header: 'Location',
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterLocation,
          isSortable: true,
          setSortedField: setSortedField,
          sortKey: 'localisationName',
        },
      },
      {
        accessorFn: (row) => row.groupName,
        header: 'Group',
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterGroup,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.measurementName,
        header: 'Measurement name',
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterMeasurement,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.serialNumber,
        header: 'Serial number',
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterSerialNumber,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.tenant,
        header: 'Tenants',
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterTenant,
          isSortable: false,
        },
      },
      {
        accessorFn: (row) => row.translatedMedium,
        header: 'Medium',
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterMedium,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.factor,
        header: 'Multiplicand',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.value,
        header: 'Value',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.readTime,
        header: 'Last reading date',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.currentMonthConsumption,
        header: 'Current month consumption',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.lastMonthSameDayConsumption,
        header: 'Last month up to same day consumption',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.percentage,
        header: 'Comparison in %',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.lastMonthConsumption,
        header: 'Last month consumption',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.unit,
        header: 'Unit',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.levelType?.translationEn,
        header: 'Level Type',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          isSortable: true,
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
        header: 'Load Type',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          isSortable: true,
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
        header: 'End Use Area',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          isSortable: true,
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
        header: 'Actions',
        meta: {
          filterVariant: null,
          isSortable: false,
        },
        cell: ({ row }) => (
          <ActionCell>
            <IconButton
              action={() => console.log(row.original)}
              popupContent="Go to profile"
              style="bg-rhino-energy-green text-white"
            >
              <FaChartBar />
            </IconButton>
            <IconButton
              action={() => console.log(row.original)}
              popupContent="Go to comsumptions to compare measurement comsumptions"
              style="bg-rhino-energy-green text-white"
            >
              <FaChartLine />
            </IconButton>
          </ActionCell>
        ),
      },
    ],
    [tableData]
  );

  useEffect(() => {
    console.log('SortedField', sortedField);
  });

  return (
    <MainLayout>
      <Title title="Dashboard" />
      <p className="text-[15px] text-[#666666] mb-[8px] mt-[19px]">
        Automatic measurements only
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
