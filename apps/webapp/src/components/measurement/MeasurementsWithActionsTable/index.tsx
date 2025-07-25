import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useCallback } from 'react';

import { CONSTANTS } from 'apps/webapp/src/constant';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import IconButton from '../../common/buttons/IconButton';
import Table from '../../common/Table';
import ActionCell from '../../common/Table/ActionCell';
import { MeasurementWithConfig } from '../SelectMeasurement/types';

interface MeasurementsWithActionsTableProps {
  selectedMeasurements: MeasurementWithConfig[];
  onRemoveMeasurement: (measurement: MeasurementWithConfig) => void;
  onEditMeasurement?: (measurement: MeasurementWithConfig) => void;
  onClearAll?: () => void;
}

const MeasurementsWithActionsTable = ({
  selectedMeasurements,
  onRemoveMeasurement,
  onEditMeasurement,
  onClearAll,
}: MeasurementsWithActionsTableProps) => {
  const { t } = useTranslation();
  const translationBaseRoute =
    'components.measurement.measurementsWithActionsTable.';

  const ActionCellFn = useCallback(
    (row: Row<MeasurementWithConfig>) => {
      return (
        <ActionCell>
          <IconButton
            type="secondary"
            action={() => onRemoveMeasurement(row.original)}
            popupContent={t(translationBaseRoute + 'actions.remove')}
          >
            <RiDeleteBin6Fill />
          </IconButton>
        </ActionCell>
      );
    },
    [onRemoveMeasurement, t, translationBaseRoute]
  );

  const columns = React.useMemo<ColumnDef<MeasurementWithConfig, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.measurement.displayName,
        header: t(translationBaseRoute + 'header.name'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.measurement.serialNumber,
        header: t(translationBaseRoute + 'header.serialNumber'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.measurement.timezone,
        header: t(translationBaseRoute + 'header.timezone'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.measurement.translatedMedium,
        header: t(translationBaseRoute + 'header.medium'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.measurement.type,
        header: t(translationBaseRoute + 'header.type'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.measurement.locationName,
        header: t(translationBaseRoute + 'header.location'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.measurement.groupName,
        header: t(translationBaseRoute + 'header.group'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: null,
        },
      },
      {
        accessorFn: (row) => row.measurement.tenants,
        header: t(translationBaseRoute + 'header.tenants'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: null,
        },
      },
      {
        id: CONSTANTS.action,
        accessorFn: () => {},
        header: t(translationBaseRoute + 'header.actions'),
        meta: {
          sortKey: null,
        },
        cell: ({ row }) => ActionCellFn(row),
      },
    ],
    [t, onRemoveMeasurement, onEditMeasurement]
  );

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        {selectedMeasurements.length > 0 && (
          <div>
            <h1 className="text-2xl font-medium text-rhino-indigo-blue">
              {t(translationBaseRoute + 'title')}
            </h1>
          </div>
        )}

        {selectedMeasurements.length > 0 && onClearAll && (
          <IconButton action={onClearAll} type="secondary">
            <p className="text-sm font-medium">Clear All</p>
          </IconButton>
        )}
      </div>

      {selectedMeasurements.length > 0 ? (
        <div className="p-4">
          <Table
            columns={columns}
            data={selectedMeasurements}
            onFilterChange={() => {}}
            emptyText={t(translationBaseRoute + 'emptyMessage')}
          />
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-2">
            <FaEdit size={48} className="mx-auto mb-4" />
          </div>
          <p className="text-gray-500 text-lg">
            {t(translationBaseRoute + 'emptyMessage')}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {t(translationBaseRoute + 'emptyMessage2')}
          </p>
        </div>
      )}
    </div>
  );
};

export default MeasurementsWithActionsTable;
