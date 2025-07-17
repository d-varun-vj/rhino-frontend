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
  PeriodicAlarmFilter,
  periodicAlarmFrequencyOptions,
  PeriodicAlarmType,
  useGetPeriodicAlarmList,
  UserViewPermission,
  ViewPermissionsType,
} from '@rhino/apis';
import { useCallback, useState } from 'react';
import { CONSTANTS } from '../../constant';
import { useTranslation } from 'react-i18next';
import { FilterVariant } from '../../components/Table/types';
import ActiveDot from '../../components/ActiveDot';
import { format } from 'date-fns';
import { convertToLocalTime, Sort } from '@rhino/utils';
import { GUIDE_LINKS } from '../../constant/guide-links';
import { useUserFilter } from '../../context/userFilter';
import AccessAuthorizer from '../../wrappers/AccessAuthorizer';

export const PeriodicAlarm = () => {
  const translationBaseRoute = 'pages.periodicAlarm.table.';
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<Sort>({
    field: '',
    direction: '',
  });
  const [filters, setFilters] = useState<PeriodicAlarmFilter>({
    name: null,
    author: null,
    active: null,
    frequency: null,
    location: null,
    shared: null,
  });
  const { client, location } = useUserFilter();

  const { t } = useTranslation();

  const { data: periodicAlarmRes, isLoading: isLoadingData } =
    useGetPeriodicAlarmList({
      page: page,
      size: pageSize,
      sort: sort,
      ...filters,
      clientUuid: client ? client.uuid : null,
      locationUuid: location ? location.uuid : null,
    });

  const ActionCellFn = useCallback(
    (row: Row<PeriodicAlarmType>) => (
      <ActionCell>
        <IconButton
          action={() => {
            // To implement action
          }}
          popupContent="Go to Consumption Profile Chart"
          style="bg-rhino-energy-green text-rhino-white"
        >
          <FaClock />
        </IconButton>
        <IconButton
          action={() => {
            // To implement action
            console.log('Edit alarm:', row.original.id);
          }}
          popupContent="Edit Alarm"
          style="bg-rhino-energy-green text-rhino-white"
        >
          <FaEdit />
        </IconButton>
        <IconButton
          action={() => {
            // To implement action
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
        filterKey: 'name',
        sortKey: 'name',
        sortDirection: sort.direction,
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
        sortDirection: sort.direction,
      },
    },
    {
      accessorFn: (row: PeriodicAlarmType) => row.sharedLocations,
      header: t(translationBaseRoute + 'header.localisationName'),
      meta: {
        filterVariant: FilterVariant.TEXT,
        filterKey: 'location',
        sortKey: 'sharedLocalisations',
        sortDirection: sort.direction,
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
        sortDirection: sort.direction,
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
        sortKey: 'lastOccurrenceDate',
        sortDirection: sort.direction,
      },
    },
    {
      accessorFn: (row: PeriodicAlarmType) => row.frequency,
      header: t(translationBaseRoute + 'header.alarmPeriod'),
      cell: (info) => info.getValue(),
      meta: {
        filterVariant: FilterVariant.SELECT,
        filterKey: 'frequency',
        sortKey: 'frequency',
        sortDirection: sort.direction,
        selectionOptions: periodicAlarmFrequencyOptions,
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
        sortDirection: sort.direction,
        selectionOptions: ['Yes', 'No'],
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

  const handleCreateAlarm = () => {
    // To implement action
  };

  const onSortClick = (field: string, direction: string) => {
    console.log(field, direction);

    setSort({ field, direction });
  };

  const onFilterChange = (
    val: string | null,
    field: string,
    filterVariant: FilterVariant | null
  ) => {
    switch (filterVariant) {
      case FilterVariant.TEXT:
        setFilters((prev: PeriodicAlarmFilter) => {
          return { ...prev, [field]: val };
        });
        break;
      case FilterVariant.SELECT: {
        setFilters((prev: PeriodicAlarmFilter) => ({
          ...prev,
          [field]: val,
        }));
        break;
      }
      case null:
        setFilters({
          name: null,
          author: null,
          active: null,
          frequency: null,
          location: null,
          shared: null,
        });
    }
  };

  return (
    <AccessAuthorizer
      viewPermissionType={ViewPermissionsType.ViewRoleBased}
      viewPermissions={[UserViewPermission.IMMEDIATE_ALARM_ROLE]}
    >
      <MainLayout title="sideMenu.periodicAlarm" isFavoriteMeterShow={false}>
        <div className="flex justify-between ">
          <PageTitle
            title={t('pages.periodicAlarm.mainHeader')}
            guide={true}
            guideLink={GUIDE_LINKS.PERIODIC_ALARM}
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
          data={periodicAlarmRes ? periodicAlarmRes.data : []}
          footer={{
            currentPage: page,
            pageSize: pageSize,
            totalCount: periodicAlarmRes ? periodicAlarmRes.meta.totalItems : 0,
            setCurrentPage: setPage,
            setPageSize: setPageSize,
          }}
          onFilterChange={onFilterChange}
          onSortSelect={onSortClick}
          isLoading={isLoadingData}
        />
      </MainLayout>
    </AccessAuthorizer>
  );
};
