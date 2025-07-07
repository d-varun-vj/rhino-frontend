import MainLayout from '../../../layouts/MainLayout';
import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import Button from '../../../components/Buttons/Button';
import { FaChartLine, FaClock, FaEdit, FaPlusCircle } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Row, ColumnDef } from '@tanstack/react-table';
import ActionCell from '../../../components/Table/ActionCell';
import IconButton from '../../../components/Buttons/IconButton';
import { VITE_WICKET_BASE_URL } from '@rhino/apis';
import { useCallback } from 'react';
import { getRibbonParams } from '../../../helpers/topribbon';
import { CONSTANTS } from '../../../constant';
import { useUserFilter } from '../../../context/userFilter';
import { useTranslation } from 'react-i18next';
import { FilterVariant } from '../../../components/Table/types';

interface AlarmData {
  id?: string;
  alarmName: string;
  author: string;
  localisationName: string;
  active: string;
  translatedMedium: string;
  shared: string;
  lastOccurrence?: string;
  alarmPeriod?: string;
  incremental?: boolean;
  type?: string;
  action: null;
}

type FilterChangeHandler = (
  value: string | null,
  field: string,
  variant: FilterVariant | null
) => void;

export const AlarmList = () => {
  const { client, location, group } = useUserFilter();
  const translationBaseRoute = 'pages.alarm.table.';

  const { t } = useTranslation();

  const mockDashboardData: AlarmData[] = [
    {
      id: '1',
      alarmName: 'Overload Alarm',
      author: 'System Monitor',
      localisationName: 'Berlin HQ',
      active: 'Yes',
      translatedMedium: 'Electricity',
      shared: 'No',
      lastOccurrence: '2024-01-15',
      alarmPeriod: 'Daily',
      incremental: false,
      type: 'overload',
      action: null,
    },
    {
      id: '2',
      alarmName: 'Leak Detection',
      author: 'Maintenance Team',
      localisationName: 'Warsaw Branch',
      active: 'No',
      translatedMedium: 'Water',
      shared: 'Yes',
      lastOccurrence: '2024-01-10',
      alarmPeriod: 'Weekly',
      incremental: true,
      type: 'leak',
      action: null,
    },
    {
      id: '3',
      alarmName: 'Power Surge',
      author: 'Automation',
      localisationName: 'Amsterdam Data Center',
      active: 'Yes',
      translatedMedium: 'Electricity',
      shared: 'No',
      lastOccurrence: '2024-01-20',
      alarmPeriod: 'Hourly',
      incremental: false,
      type: 'surge',
      action: null,
    },
  ];

  const ActionCellFn = useCallback(
    (row: Row<AlarmData>) => (
      <ActionCell>
        <IconButton
          action={() => {
            window.location.href =
              VITE_WICKET_BASE_URL +
              'consumptionProfileChart' +
              getRibbonParams({ client, location, group }) +
              `&uuid=${row.original.id}&incremental=${row.original.incremental}&type=${row.original.type}&shouldCompareMeasurement=${false}`;
          }}
          popupContent="Go to Consumption Profile Chart"
          style="bg-rhino-energy-green text-rhino-white"
        >
          <FaClock />
        </IconButton>
        <IconButton
          action={() => {
            window.location.href =
              VITE_WICKET_BASE_URL +
              'consumptionChart' +
              getRibbonParams({ client, location, group }) +
              `&uuid=${row.original.id}&incremental=${row.original.incremental}&type=${row.original.type}&shouldCompareMeasurement=${true}`;
          }}
          popupContent="Go to Consumption Chart"
          style="bg-rhino-energy-green text-rhino-white"
        >
          <FaChartLine />
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
    [client, location, group]
  );

  const columns: ColumnDef<AlarmData>[] = [
    {
      accessorFn: (row: AlarmData) => row.alarmName,
      header: t(translationBaseRoute + 'header.alarmName'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.TEXT,
        filterKey: 'alarmName',
        sortKey: 'alarmName',
      },
    },
    {
      accessorFn: (row: AlarmData) => row.author,
      header: t(translationBaseRoute + 'header.author'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.TEXT,
        filterKey: 'author',
        sortKey: 'author',
      },
    },
    {
      accessorFn: (row: AlarmData) => row.localisationName,
      header: t(translationBaseRoute + 'header.localisationName'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.SELECT,
        filterKey: 'localisationName',
        sortKey: 'localisationName',
      },
    },
    {
      accessorFn: (row: AlarmData) => row.active,
      header: t(translationBaseRoute + 'header.active'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.SELECT,
        filterKey: 'active',
        sortKey: 'active',
      },
    },
    {
      accessorKey: 'lastOccurrence',
      header: t(translationBaseRoute + 'header.lastOccurrence'),
      cell: (info) => info.getValue(),
      meta: {
        filterKey: 'lastOccurrence',
        sortKey: 'lastOccurrence',
      },
    },
    {
      accessorFn: (row: AlarmData) => row.alarmPeriod,
      header: t(translationBaseRoute + 'header.alarmPeriod'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.SELECT,
        filterKey: 'alarmPeriod',
        sortKey: 'alarmPeriod',
      },
    },
    {
      accessorFn: (row: AlarmData) => row.shared,
      header: t(translationBaseRoute + 'header.shared'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.SELECT,
        filterKey: 'shared',
        sortKey: 'shared',
      },
    },
    {
      id: CONSTANTS.action,
      accessorFn: (row: AlarmData) => row.action,
      header: 'Action',
      meta: {
        sortKey: null,
      },
      cell: ({ row }: { row: Row<AlarmData> }) => ActionCellFn(row),
    },
  ];

  const handleFilterChange: FilterChangeHandler = (val, field, variant) => {
    console.log('Filter change:', val, field, variant);
  };

  const handleCreateAlarm = () => {
    console.log('Create Alarm clicked');
  };

  return (
    <MainLayout title="sideMenu.dashboard" isFavoriteMeterShow={false}>
      <div className="flex justify-between ">
        <PageTitle
          title={t('pages.alarm.mainHeader')}
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
        data={mockDashboardData}
        onFilterChange={handleFilterChange}
      />
    </MainLayout>
  );
};
