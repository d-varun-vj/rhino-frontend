import MainLayout from '../../layouts/MainLayout';
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Buttons/Button';
import { FaClock, FaEdit, FaPlusCircle } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Row, ColumnDef } from '@tanstack/react-table';
import ActionCell from '../../components/Table/ActionCell';
import IconButton from '../../components/Buttons/IconButton';
import {
  PeriodicAlarmTableData,
  PeriodicAlarmType,
  useGetAlarmList,
} from '@rhino/apis';
import { useCallback, useEffect, useState } from 'react';
import { CONSTANTS } from '../../constant';
import { useTranslation } from 'react-i18next';
import { FilterVariant } from '../../components/Table/types';
import ActiveDot from '../../components/Buttons/ActiveDot';
import { format } from 'date-fns';
import { convertToLocalTime } from '@rhino/utils';

type FilterChangeHandler = (
  value: string | null,
  field: string,
  variant: FilterVariant | null
) => void;

export const PeriodicAlarm = () => {
  const translationBaseRoute = 'pages.periodicAlarm.table.';
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { t } = useTranslation();

  const { data: getTableDataList, isLoading: isLoadingTableData } =
    useGetAlarmList({
      page: page,
      size: pageSize,
    });

  const [tableData, setTableData] = useState<PeriodicAlarmTableData>();

  useEffect(() => {
    const getData = () => {
      try {
        setTableData(getTableDataList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [getTableDataList]);

  const ActionCellFn = useCallback(
    (row: Row<PeriodicAlarmType>) => (
      <ActionCell>
        <IconButton
          action={() => {
            console.log();
          }}
          popupContent="Go to Consumption Profile Chart"
          style="bg-rhino-energy-green text-rhino-white"
        >
          <FaClock />
        </IconButton>
        <IconButton
          action={() => {
            console.log('Edit alarm:', row.original.id);
          }}
          popupContent="Edit Alarm"
          style="bg-rhino-energy-green text-rhino-white"
        >
          <FaEdit />
        </IconButton>
        <IconButton
          action={() => {
            console.log('Delete alarm:', row.original.id);
          }}
          popupContent="Delete Alarm"
          style="bg-rhino-indigo-blue text-rhino-white"
        >
          <RiDeleteBin6Fill />
        </IconButton>
      </ActionCell>
    ),
    []
  );

  const columns: ColumnDef<PeriodicAlarmType>[] = [
    {
      accessorFn: (row: PeriodicAlarmType) => row.name,
      header: t(translationBaseRoute + 'header.alarmName'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.TEXT,
        filterKey: 'alarmName',
        sortKey: 'alarmName',
      },
    },
    {
      accessorFn: (row: PeriodicAlarmType) => row.author,
      header: t(translationBaseRoute + 'header.author'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.TEXT,
        filterKey: 'author',
        sortKey: 'author',
      },
    },
    {
      accessorFn: (row: PeriodicAlarmType) => row.sharedLocations,
      header: t(translationBaseRoute + 'header.localisationName'),
      meta: {
        filterVariant: FilterVariant.TEXT,
        filterKey: 'localisationName',
        sortKey: 'localisationName',
        renderCell: (value) => {
          return (
            <span>
              {Array.isArray(value) && value.length > 0
                ? `${value[0]} ${value.length > 1 ? `, +${value.length - 1}` : ''}`
                : '-'}
            </span>
          );
        },
      },
    },
    {
      accessorFn: (row: PeriodicAlarmType) => row.active,
      header: t(translationBaseRoute + 'header.active'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.SELECT,
        filterKey: 'active',
        sortKey: 'active',
        selectionOptions: ['Yes', 'No'],
        renderCell: (value) => {
          return <ActiveDot type={value == true ? 'active' : 'inactive'} />;
        },
      },
    },
    {
      accessorFn: (row: PeriodicAlarmType) => row.lastOccurrenceDate,
      header: t(translationBaseRoute + 'header.lastOccurrence'),
      cell: (info) => {
        if (info.row.original.lastOccurrenceDate) {
          return format(
            convertToLocalTime(info.row.original.lastOccurrenceDate),
            'dd-MM-yyyy HH:mm'
          );
        }
        return '-';
      },
      meta: {
        filterKey: 'lastOccurrence',
        sortKey: 'lastOccurrence',
      },
    },
    {
      accessorFn: (row: PeriodicAlarmType) => row.frequency,
      header: t(translationBaseRoute + 'header.alarmPeriod'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.SELECT,
        filterKey: 'alarmPeriod',
        sortKey: 'alarmPeriod',
      },
    },
    {
      accessorFn: (row: PeriodicAlarmType) => row.shared,
      header: t(translationBaseRoute + 'header.shared'),
      cell: (info) => {
        return info.getValue() == true ? 'Yes' : 'No';
      },
      meta: {
        filterVariant: FilterVariant.SELECT,
        filterKey: 'shared',
        sortKey: 'shared',
      },
    },
    {
      id: CONSTANTS.action,
      accessorFn: (row: PeriodicAlarmType) => row.action,
      header: 'Action',
      meta: {
        sortKey: null,
      },
      cell: ({ row }: { row: Row<PeriodicAlarmType> }) => ActionCellFn(row),
    },
  ];

  const handleFilterChange: FilterChangeHandler = (val, field, variant) => {
    console.log('Filter change:', val, field, variant);
  };

  const handleCreateAlarm = () => {
    console.log('Create Alarm clicked');
  };

  return (
    <MainLayout title="sideMenu.periodicAlarm" isFavoriteMeterShow={false}>
      <div className="flex justify-between ">
        <PageTitle
          title={t('pages.periodicAlarm.mainHeader')}
          guide={true}
          guideLink="https://rhino.energy/wp-content/uploads/2023/04/Rhino-Platform-Access-nawigation-Dashboard-20230420.pdf"
        />
        <Button
          text="Create periodic alarm"
          type="primary"
          icon={<FaPlusCircle />}
          action={handleCreateAlarm}
        />
      </div>
      <Table
        columns={columns}
        data={tableData ? tableData.data : []}
        footer={{
          currentPage: page,
          pageSize: pageSize,
          totalCount: tableData ? tableData.meta.totalItems : 0,
          setCurrentPage: setPage,
          setPageSize: setPageSize,
        }}
        onFilterChange={handleFilterChange}
        isLoading={isLoadingTableData}
      />
    </MainLayout>
  );
};
