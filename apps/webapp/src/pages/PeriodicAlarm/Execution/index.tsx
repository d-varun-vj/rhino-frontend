import { useDownloadPeriodicReportUrl, useGetExecutions } from '@rhino/apis';
import { Sort, formatDateTime, formatLocalDateTime } from '@rhino/utils';
import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useCallback, useRef, useState } from 'react';
import {
  ExecutionFilter,
  ExecutionStatus,
  PeriodicAlarmExecution,
} from '../types';
import { EXECUTION_STATUS_COLOUR, STATUS_COLOUR } from './config';

import { ModalProps } from '@mantine/core';
import IconButton from 'apps/webapp/src/components/common/buttons/IconButton';
import DateRangeWithTimePickerField from 'apps/webapp/src/components/common/datetime/DateRangeWithTimePickerField';
import CustomModal from 'apps/webapp/src/components/common/modals/CustomModal';
import Table from 'apps/webapp/src/components/common/Table';
import ActionCell from 'apps/webapp/src/components/common/Table/ActionCell';
import { FilterVariant } from 'apps/webapp/src/components/common/Table/types';
import message from 'apps/webapp/src/components/notifier';
import { CONSTANTS } from 'apps/webapp/src/constant';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { RiDownload2Line } from 'react-icons/ri';
import { getTranslationOptions } from '../helper';

interface ExecutionProps {
  modalProps: ModalProps;
  alarmConfig: {
    uuid: string;
    name: string;
  };
}

const Execution = ({ modalProps, alarmConfig }: ExecutionProps) => {
  const { t } = useTranslation('periodicAlarm');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<Sort>({
    field: 'occurence',
    direction: 'desc',
  });
  const downloadUrlMutation = useDownloadPeriodicReportUrl();
  const downloadMutationRef = useRef(downloadUrlMutation);
  downloadMutationRef.current = downloadUrlMutation;

  const [filters, setFilters] = useState<ExecutionFilter>({
    executionStatus: null,
    startDate: null,
    endDate: null,
  });

  const { data: executionRes, isLoading } = useGetExecutions({
    page: page,
    size: pageSize,
    sort: sort,
    uuid: alarmConfig.uuid,
    ...filters,
  });

  const ActionCellFn = useCallback(
    (row: Row<PeriodicAlarmExecution>) => (
      <ActionCell>
        <IconButton
          action={() => {
            downloadMutationRef.current.mutate(row.original.uuid, {
              onSuccess: (data) => {
                if (data.presignedUrl) {
                  window.location.href = data.presignedUrl;
                }
              },
              onError: () => {
                message.error(t('execution.download.error'));
              },
            });
          }}
          loading={
            downloadMutationRef.current.isPending &&
            downloadMutationRef.current.variables === row.original.uuid
          }
          disabled={
            row.original.executionStatus === (ExecutionStatus.ERROR as string)
          }
        >
          <div className={clsx('flex gap-2 items-center')}>
            <RiDownload2Line className="text-lg" />
            <span className="text-sm">{t('execution.download.btn')}</span>
          </div>
        </IconButton>
      </ActionCell>
    ),
    [downloadMutationRef, t]
  );

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
        setFilters((prev: ExecutionFilter) => {
          return { ...prev, [field]: val };
        });
        break;
      case FilterVariant.SELECT: {
        setFilters((prev: ExecutionFilter) => ({
          ...prev,
          [field]: val,
        }));
        break;
      }
      case null:
        setFilters({
          executionStatus: null,
          startDate: null,
          endDate: null,
        });
    }
  };

  const columns = React.useMemo<ColumnDef<PeriodicAlarmExecution, unknown>[]>(
    () => [
      {
        accessorFn: (row: PeriodicAlarmExecution) => row.occurence,
        header: t('execution.table.occurence'),
        cell: (info) => {
          if (info.row.original.occurence) {
            return formatLocalDateTime(info.row.original.occurence);
          }
          return '-';
        },
        meta: {
          sortKey: 'occurence',
          sortDirection: sort.direction,
          filterVariant: FilterVariant.CUSTOM,
          customFilter: (
            <DateRangeWithTimePickerField
              onChange={(val) => {
                setFilters((prev: ExecutionFilter) => ({
                  ...prev,
                  startDate: val.startDate
                    ? val.startDate + ' ' + val.startTime
                    : null,
                  endDate: val.endDate ? val.endDate + ' ' + val.endTime : null,
                }));
              }}
              size="xs"
            />
          ),
          styles: {
            maxWidth: 'max-w-62',
            minWidth: 'min-w-62',
          },
        },
      },
      {
        accessorFn: (row: PeriodicAlarmExecution) => row.status,
        header: t('execution.table.status'),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'status',
          sortKey: 'status',
          sortDirection: sort.direction,
          selectionOptions: getTranslationOptions({ t }).STATUS,
          renderCell: (value, row) => {
            const status = (row as PeriodicAlarmExecution)
              .status as keyof typeof STATUS_COLOUR;
            const color = STATUS_COLOUR[status] || STATUS_COLOUR.DEFAULT;
            return (
              <span className={`${color}  font-semibold text-[12px]`}>
                {
                  getTranslationOptions({ t }).STATUS.find(
                    (option) => option.value === value
                  )?.label as string
                }
              </span>
            );
          },
          styles: {
            maxWidth: 'max-w-28',
            minWidth: 'min-w-28',
          },
        },
      },
      {
        accessorFn: (row: PeriodicAlarmExecution) => row.executionStatus,
        header: t('execution.table.executionStatus'),
        cell: (info) => {
          return info.getValue();
        },
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'executionStatus',
          sortKey: 'executionStatus',
          sortDirection: sort.direction,
          selectionOptions: getTranslationOptions({ t }).EXECUTION_STATUS,
          renderCell: (value, row) => {
            const status = (row as PeriodicAlarmExecution)
              .executionStatus as keyof typeof EXECUTION_STATUS_COLOUR;
            const color =
              EXECUTION_STATUS_COLOUR[status] ||
              EXECUTION_STATUS_COLOUR.DEFAULT;
            return (
              <span className={`${color}  font-semibold text-[12px]`}>
                {
                  getTranslationOptions({ t }).EXECUTION_STATUS.find(
                    (option) => option.value === value
                  )?.label as string
                }
              </span>
            );
          },
          styles: {
            maxWidth: 'max-w-28',
            minWidth: 'min-w-28',
          },
        },
      },
      {
        accessorFn: (row: PeriodicAlarmExecution) => row.timeRange,
        header: t('execution.table.timeRange'),
        cell: (info) => {
          if (info.row.original.startRange && info.row.original.endRange) {
            return (
              formatDateTime(info.row.original.startRange) +
              ' - ' +
              formatDateTime(info.row.original.endRange)
            );
          }
          return '-';
        },
        meta: {
          sortKey: null,
          styles: {
            maxWidth: 'max-w-62',
            minWidth: 'min-w-62',
          },
        },
      },
      {
        id: CONSTANTS.action,
        accessorFn: (row: PeriodicAlarmExecution) => row.action,
        header: t('execution.table.action'),
        meta: {
          sortKey: null,
          styles: {
            maxWidth: 'max-w-44',
            minWidth: 'min-w-44',
          },
        },
        cell: ({ row }: { row: Row<PeriodicAlarmExecution> }) =>
          ActionCellFn(row),
      },
    ],
    [ActionCellFn, sort.direction, t]
  );

  return (
    <CustomModal
      {...modalProps}
      size={'65%'}
      title={
        <h1
          className="pl-0  text-left font-bold text-[32px] tracking-[0]
              text-rhino-indigo-blue  "
        >
          {alarmConfig.name}
        </h1>
      }
    >
      <Table
        columns={columns}
        data={executionRes ? executionRes.data : []}
        textNowarp
        onFilterChange={onFilterChange}
        footer={{
          currentPage: page,
          pageSize: pageSize,
          totalCount: executionRes ? executionRes.meta.totalItems : 0,
          setCurrentPage: setPage,
          setPageSize: setPageSize,
        }}
        onSortSelect={onSortClick}
        isLoading={isLoading}
      />
    </CustomModal>
  );
};

export default Execution;
