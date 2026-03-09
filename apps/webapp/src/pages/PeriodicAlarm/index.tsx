import {
  API_RESPONSES,
  PeriodicAlarmFilter,
  PeriodicAlarmType,
  UserViewPermission,
  ViewPermissionsType,
  useDeletePeriodicAlarm,
  useGetPeriodicAlarmList,
} from '@rhino/apis';
import {
  Sort,
  convertToLocalTime,
  formatListSummary,
  useClearOnNavigation,
  useLocalStorage,
} from '@rhino/utils';
import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { FaClock, FaEdit, FaEye, FaPlusCircle } from 'react-icons/fa';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { ExecutionActionProps, ExecutionStateProps } from './types';

import { format } from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import CustomButton from '../../components/common/buttons/CustomButton';
import IconButton from '../../components/common/buttons/IconButton';
import StatusDot from '../../components/common/indicators/StatusDot';
import openDeleteConfirmationModal from '../../components/common/modals/deleteConfirmationModal';
import Table from '../../components/common/Table';
import ActionCell from '../../components/common/Table/ActionCell';
import { FilterVariant } from '../../components/common/Table/types';
import message from '../../components/notifier';
import PageTitle from '../../components/typography/PageTitle';
import { CONSTANTS } from '../../constant';
import { GUIDE_LINKS } from '../../constant/guide-links';
import { LOCAL_STORAGE_KEYS } from '../../constant/local-storage-keys';
import { useUserFilter } from '../../context/userFilter';
import { getRibbonParams } from '../../helpers/topribbon';
import MainLayout from '../../layouts/MainLayout';
import { paths } from '../../routes/paths';
import AccessAuthorizer from '../../wrappers/AccessAuthorizer';
import Execution from './Execution';
import { getTranslationOptions } from './helper';

const initialExecutionState = {
  openExecution: false,
  selectedAlarmUuid: '',
  selectedAlarmName: '',
};
const INITIAL_FILTERS: PeriodicAlarmFilter = {
  name: null,
  author: null,
  active: null,
  frequency: null,
  location: null,
  shared: null,
};

function executionReducer(
  state: ExecutionStateProps,
  action: ExecutionActionProps
) {
  switch (action.type) {
    case 'SET_OPEN_EXECUTION':
      return { ...state, openExecution: !state.openExecution };
    case 'SET_ALARM_UUID':
      return { ...state, selectedAlarmUuid: action.payload };
    case 'SET_ALARM_NAME':
      return { ...state, selectedAlarmName: action.payload };
    case 'RESET':
      return initialExecutionState;
    default:
      return state;
  }
}

const PeriodicAlarm = () => {
  const translationTableBase = 'table.';
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<Sort>({
    field: '',
    direction: '',
  });
  const { save, load, clear } = useLocalStorage<PeriodicAlarmFilter>(
    LOCAL_STORAGE_KEYS.PERIODIC_ALARM.LIST_FILTERS
  );
  const [filters, setFilters] = useState<PeriodicAlarmFilter>(
    () => load() ?? INITIAL_FILTERS
  );

  const [executionState, dispatch] = useReducer(
    executionReducer,
    initialExecutionState
  );

  const { clients, locations, groups } = useUserFilter();
  const { t } = useTranslation('periodicAlarm');
  const navigate = useNavigate();

  const routeLocation = useLocation();
  const { isCreated, isUpdated, isError, errMessage } =
    (routeLocation.state as never) || {};

  useEffect(() => {
    if (isCreated) message.success(t('create.success'));
    if (isUpdated) message.success(t('update.success'));
    if (isError) {
      message.error(
        t(
          errMessage === API_RESPONSES.forbidden
            ? 'toast.forbidden'
            : 'toast.somethingWentWrong',
          { ns: 'common' }
        )
      );
    }

    if (isCreated || isUpdated || isError) {
      navigate(routeLocation.pathname, { replace: true });
    }

    window.scrollTo({ top: 0 });
  }, [isCreated, isUpdated, isError, errMessage, t]);

  const isPeriodicAlarmSectionPath = useCallback(
    (path: string) => path.includes(paths.alarm.periodic.base),
    []
  );

  const clearFiltersStateAndStorage = useCallback(() => {
    clear();
    setFilters(INITIAL_FILTERS);
  }, [clear]);

  useClearOnNavigation({
    onNavigate: (destinationPath) => {
      if (!isPeriodicAlarmSectionPath(destinationPath)) {
        clearFiltersStateAndStorage();
      }
    },
    deps: [isPeriodicAlarmSectionPath],
  });

  const { data: periodicAlarmRes, isLoading: isLoadingData } =
    useGetPeriodicAlarmList({
      page: page,
      size: pageSize,
      sort: sort,
      ...filters,
      clientUuid: clients ? clients[0].uuid : null,
      locationUuid: locations ? locations[0].uuid : null,
    });
  const { mutate: deleteAlarm, isPending } = useDeletePeriodicAlarm();

  const handleDeleteAlarm = useCallback(
    (alarm: PeriodicAlarmType) => {
      openDeleteConfirmationModal({
        title: t('delete.title'),
        message: t('delete.message', { name: alarm.name }),
        confirmLabel: t('delete', { ns: 'common' }),
        cancelLabel: t('cancel', { ns: 'common' }),
        onConfirm: () => {
          deleteAlarm(alarm.uuid, {
            onSuccess: () => {
              message.success(t('delete.success'));
            },
            onError: () => {
              message.error(t('delete.error'));
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
            dispatch({ type: 'SET_OPEN_EXECUTION' });
            dispatch({ type: 'SET_ALARM_UUID', payload: row.original.uuid });
            dispatch({ type: 'SET_ALARM_NAME', payload: row.original.name });
          }}
          popupContent={t('execution.btnPopup')}
          data-testid="execution-btn"
        >
          <FaClock />
        </IconButton>

        {!row.original.isManageable && (
          <IconButton
            action={() => {
              navigate(
                generatePath(paths.alarm.periodic.update, {
                  uuid: row.original.uuid,
                })
              );
            }}
            popupContent="View Alarm"
            data-testid="view-btn"
          >
            <FaEye />
          </IconButton>
        )}
        {row.original.isManageable && (
          <IconButton
            action={() => {
              navigate(
                generatePath(paths.alarm.periodic.update, {
                  uuid: row.original.uuid,
                })
              );
            }}
            popupContent="Edit Alarm"
            data-testid="edit-btn"
          >
            <FaEdit />
          </IconButton>
        )}
        {row.original.hasCreatorAccess && (
          <IconButton
            type="secondary"
            popupContent={t('delete.title')}
            action={() => handleDeleteAlarm(row.original)}
            disabled={isPending}
            data-testid="delete-btn"
          >
            <RiDeleteBin6Fill />
          </IconButton>
        )}
      </ActionCell>
    ),
    [handleDeleteAlarm, isPending, t, dispatch, navigate]
  );

  const columns = React.useMemo<ColumnDef<PeriodicAlarmType, unknown>[]>(
    () => [
      {
        accessorFn: (row: PeriodicAlarmType) => row.name,
        header: t(translationTableBase + 'header.alarmName'),
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
        header: t(translationTableBase + 'header.author'),
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
        header: t(translationTableBase + 'header.localisationName'),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'location',
          sortKey: null,
          renderCell: (value) => <span>{formatListSummary(value)}</span>,
        },
      },
      {
        accessorFn: (row: PeriodicAlarmType) => row.active,
        header: t(translationTableBase + 'header.active'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'active',
          sortKey: 'active',
          sortDirection: sort.direction,
          selectionOptions: getTranslationOptions({ t }).SHARED,
          renderCell: (value) => {
            return <StatusDot type={value ? 'active' : 'inactive'} />;
          },
        },
      },
      {
        accessorFn: (row: PeriodicAlarmType) => row.lastOccurrenceDate,
        header: t(translationTableBase + 'header.lastOccurrence'),
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
        header: t(translationTableBase + 'header.alarmPeriod'),
        cell: (info) => {
          return getTranslationOptions({
            t,
          }).PERIODIC_ALARM_FREQUENCY_OPTIONS.find(
            (option) => option.value === info.getValue()
          )?.label as string;
        },
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'frequency',
          sortKey: null,
          selectionOptions: getTranslationOptions({ t })
            .PERIODIC_ALARM_FREQUENCY_OPTIONS,
        },
      },
      {
        accessorFn: (row: PeriodicAlarmType) => row.shared,
        header: t(translationTableBase + 'header.shared'),
        cell: (info) => {
          return getTranslationOptions({
            t,
          }).SHARED.find(
            (option) => option.value === (info.getValue() ? 'Yes' : 'No')
          )?.label as string;
        },
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'shared',
          sortKey: 'shared',
          sortDirection: sort.direction,
          selectionOptions: getTranslationOptions({ t }).SHARED,
        },
      },
      {
        id: CONSTANTS.action,
        accessorFn: (row: PeriodicAlarmType) => row.action,
        header: t(translationTableBase + 'header.actions'),
        meta: {
          sortKey: null,
        },
        cell: ({ row }: { row: Row<PeriodicAlarmType> }) => ActionCellFn(row),
      },
    ],
    [ActionCellFn, sort.direction, t]
  );

  const handleCreateAlarm = () => {
    navigate(
      paths.alarm.periodic.create +
        getRibbonParams({
          clients,
          locations,
          groups,
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
          const updated = { ...prev, [field]: val };
          save(updated);
          return updated;
        });
        break;
      case FilterVariant.SELECT: {
        setFilters((prev: PeriodicAlarmFilter) => {
          const updated = { ...prev, [field]: val };
          save(updated);
          return updated;
        });
        break;
      }
    }
  };

  return (
    <AccessAuthorizer
      viewPermissionType={ViewPermissionsType.ViewRoleBased}
      viewPermissions={[UserViewPermission.PERIODIC_ALARM_ROLE]}
    >
      <MainLayout
        title={t('sideMenu.periodicAlarm', { ns: 'layout' })}
        topRibbon={{
          group: {
            hidden: true,
          },
          favoriteMeter: {
            hidden: true,
          },
        }}
      >
        <div className="flex justify-between items-end py-4">
          <PageTitle
            title={t('mainHeader')}
            guide={true}
            guideLink={GUIDE_LINKS.PERIODIC_ALARM}
          />
          <CustomButton
            text={t('createBtn')}
            type="primary"
            icon={<FaPlusCircle />}
            onClick={handleCreateAlarm}
            data-testid="create-btn"
          />
        </div>

        <Table
          columns={columns}
          data={periodicAlarmRes ? periodicAlarmRes.data : []}
          activeFilters={{
            name: filters.name,
            author: filters.author,
            active: filters.active,
            frequency: filters.frequency,
            location: filters.location,
            shared: filters.shared,
          }}
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
          dataTestIdPrefix="periodic-alarm"
        />

        <Execution
          key={`${executionState.selectedAlarmUuid}-${Date.now().toString()}`}
          modalProps={{
            opened: executionState.openExecution,
            onClose() {
              dispatch({ type: 'SET_OPEN_EXECUTION' });
            },
          }}
          alarmConfig={{
            name: executionState.selectedAlarmName,
            uuid: executionState.selectedAlarmUuid,
          }}
        />
      </MainLayout>
    </AccessAuthorizer>
  );
};

export default PeriodicAlarm;
