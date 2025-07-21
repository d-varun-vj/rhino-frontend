import {
  PeriodicAlarmFilter,
  PeriodicAlarmType,
  UserViewPermission,
  ViewPermissionsType,
  periodicAlarmFrequencyOptions,
  useDeletePeriodicAlarm,
  useGetPeriodicAlarmList,
} from '@rhino/apis';
import { Sort, convertToLocalTime, formatListSummary } from '@rhino/utils';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { FaClock, FaEdit, FaPlusCircle } from 'react-icons/fa';

import { format } from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomButton from '../../components/common/buttons/CustomButton';
import IconButton from '../../components/common/buttons/IconButton';
import StatusDot from '../../components/common/indicators/StatusDot';
import openDeleteConfirmationModal from '../../components/common/modals/deleteConfirmationModal';
import Table from '../../components/common/Table';
import ActionCell from '../../components/common/Table/ActionCell';
import { FilterVariant } from '../../components/common/Table/types';
import PageTitle from '../../components/typography/PageTitle';
import { CONSTANTS } from '../../constant';
import { GUIDE_LINKS } from '../../constant/guide-links';
import { useUserFilter } from '../../context/userFilter';
import { getRibbonParams } from '../../helpers/topribbon';
import MainLayout from '../../layouts/MainLayout';
import { locations } from '../../routes/locations';
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
  const { client, location, group } = useUserFilter();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: periodicAlarmRes, isLoading: isLoadingData } =
    useGetPeriodicAlarmList({
      page: page,
      size: pageSize,
      sort: sort,
      ...filters,
      clientUuid: client ? client.uuid : null,
      locationUuid: location ? location.uuid : null,
    });
  const { mutate: deleteAlarm, isPending } = useDeletePeriodicAlarm();

  const handleDeleteAlarm = useCallback(
    (alarm: PeriodicAlarmType) => {
      openDeleteConfirmationModal({
        title: t('pages.periodicAlarm.delete.title'),
        message: t('pages.periodicAlarm.delete.message', { name: alarm.name }),
        confirmLabel: t('common.delete'),
        cancelLabel: t('common.cancel'),
        onConfirm: () => {
          deleteAlarm(alarm.uuid, {
            onSuccess: () => {
              toast.success(t('pages.periodicAlarm.delete.success'));
            },
            onError: () => {
              toast.error(t('pages.periodicAlarm.delete.error'));
            },
          });
        },
      });
    },
    [deleteAlarm, t]
  );

  const ActionCellFn = useCallback(
    (row: Row<PeriodicAlarmType>) => (
      <ActionCell>
        <IconButton
          action={() => {
            // To implement action
          }}
          popupContent="Go to Consumption Profile Chart"
        >
          <FaClock />
        </IconButton>
        <IconButton
          action={() => {
            // To implement action
            console.log('Edit alarm:', row.original.id);
          }}
          popupContent="Edit Alarm"
        >
          <FaEdit />
        </IconButton>
        <IconButton
          type="secondary"
          popupContent="Delete Alarm"
          action={() => handleDeleteAlarm(row.original)}
          disabled={isPending || !row.original.isDeletable}
        >
          <RiDeleteBin6Fill />
        </IconButton>
      </ActionCell>
    ),
    [handleDeleteAlarm, isPending]
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
        renderCell: (value) => <span>{formatListSummary(value)}</span>,
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
          return <StatusDot type={value ? 'active' : 'inactive'} />;
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
        return info.getValue() ? 'Yes' : 'No';
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
      header: t(translationBaseRoute + 'header.actions'),
      meta: {
        sortKey: null,
      },
      cell: ({ row }: { row: Row<PeriodicAlarmType> }) => ActionCellFn(row),
    },
  ];

  const handleCreateAlarm = () => {
    navigate(
      locations.periodicAlarm.create +
        getRibbonParams({
          client,
          location,
          group,
        })
    );
  };

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
          <CustomButton
            text="Create periodic alarm"
            type="primary"
            iconPosition="right"
            icon={<FaPlusCircle />}
            onClick={handleCreateAlarm}
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
