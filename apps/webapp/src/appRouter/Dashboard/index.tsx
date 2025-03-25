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

const Dashboard = () => {
  const [filterLocation, setFilterLocation] = useState<string>();

  // useEffect(() => {
  //   console.log('SELECTED', filterLocation);
  // });

  const columns = React.useMemo<ColumnDef<DashboardType, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.localisationName,
        header: 'Location',
        cell: (info) => info.getValue(),
        meta: {
          setFilterValue: setFilterLocation,
        },
      },
      {
        accessorFn: (row) => row.groupName,
        header: 'Group',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.measurementName,
        header: 'Measurement name',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.serialNumber,
        header: 'Serial number',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.tenant,
        header: 'Tenants',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.translatedMedium,
        header: 'Medium',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.factor,
        header: 'Multiplicand',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          selectionOptions: [],
        },
      },
      {
        accessorFn: (row) => row.value,
        header: 'Value',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          selectionOptions: [],
        },
      },
      {
        accessorFn: (row) => row.readTime,
        header: 'Last reading date',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          selectionOptions: [],
        },
      },
      {
        accessorFn: (row) => row.currentMonthConsumption,
        header: 'Current month consumption',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          selectionOptions: [],
        },
      },
      {
        accessorFn: (row) => row.lastMonthSameDayConsumption,
        header: 'Last month up to same day consumption',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          selectionOptions: [],
        },
      },
      {
        accessorFn: (row) => row.percentage,
        header: 'Comparison in %',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
          selectionOptions: [],
        },
      },
      {
        accessorFn: (row) => row.lastMonthConsumption,
        header: 'Last month consumption',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
        },
      },
      {
        accessorFn: (row) => row.unit,
        header: 'Unit',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: null,
        },
      },
      {
        accessorFn: (row) => row.levelType?.name,
        header: 'Level Type',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          selectionOptions: [
            'Grid-Level Main Meter',
            'Building-level Main Meter',
            'Tenant Cost Allocation Meter',
            'Analytical Submeter',
          ],
        },
      },
      {
        accessorFn: (row) => row.loadType?.name,
        header: 'Load Type',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          selectionOptions: [],
        },
      },
      {
        accessorFn: (row) => row.endUseArea?.name,
        header: 'End Use Area',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
          selectionOptions: [],
        },
      },
      {
        id: 'action',
        accessorFn: (row) => row.action,
        header: 'Actions',
        meta: {
          filterVariant: null,
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
    []
  );

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
    ],
    queryFn: () =>
      getTableData({
        page: page,
        size: pageSize,
        clientId: client ? client.uuid : null,
        locationUuid: location ? location.uuid : null,
        groupUuid: group ? group.uuid : null,
        locationName: filterLocation ? filterLocation : null,
      }),
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
