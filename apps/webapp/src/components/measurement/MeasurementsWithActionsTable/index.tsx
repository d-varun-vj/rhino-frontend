import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useCallback, useReducer } from 'react';

import { CONSTANTS } from 'apps/webapp/src/constant';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import IconButton from '../../common/buttons/IconButton';
import Table from '../../common/Table';
import ActionCell from '../../common/Table/ActionCell';
import CustomSortCell from '../../common/Table/CustomSortCell';
import GoToConsumptionIcon from '../../consumption/GoToConsumptionIcon';
import { getTranslationOptions } from '../helper';
import { MeasurementWithConfig, SortArrow } from '../SelectMeasurement/types';
import MeasurementInfoModal from './MeasurementInfoModal';
import { MeasurementInfoActionProps, MeasurementInfoStateProps } from './types';

interface MeasurementsWithActionsTableProps {
  selectedMeasurements: MeasurementWithConfig[];
  onRemoveMeasurement: (measurement: MeasurementWithConfig) => void;
  onClearAll?: () => void;
  isReadOnly?: boolean;
  enableCustomSort?: boolean;
  onCustomSortMove?: (rowIndex: number, direction: SortArrow) => void;
}

const initialMeasurementInfoState = {
  openInfo: false,
  selectedMeasurementUuid: '',
  customSortOrders: [],
};

const measurementInfoReducer = (
  state: MeasurementInfoStateProps,
  action: MeasurementInfoActionProps
) => {
  switch (action.type) {
    case 'SET_OPEN_INFO':
      return { ...state, openInfo: !state.openInfo };
    case 'SET_MEAUREMENT_UUID':
      return { ...state, selectedMeasurementUuid: action.payload };
    case 'RESET':
      return initialMeasurementInfoState;
    default:
      return state;
  }
};

const MeasurementsWithActionsTable = ({
  selectedMeasurements,
  onRemoveMeasurement,
  onClearAll,
  isReadOnly = false,
  enableCustomSort = false,
  onCustomSortMove,
}: MeasurementsWithActionsTableProps) => {
  const { t } = useTranslation('components');
  const translationBaseRoute = 'measurement.measurementsWithActionsTable.';
  const [measurementInfoState, dispatch] = useReducer(
    measurementInfoReducer,
    initialMeasurementInfoState
  );

  const handleCustomSortMove = React.useCallback(
    (rowIndex: number, direction: SortArrow) => {
      onCustomSortMove?.(rowIndex, direction);
    },
    [onCustomSortMove]
  );

  const ActionCellFn = useCallback(
    (row: Row<MeasurementWithConfig>) => {
      return (
        <ActionCell>
          <IconButton
            action={() => {
              dispatch({
                type: 'SET_MEAUREMENT_UUID',
                payload: row.original.measurement.uuid,
              });
              dispatch({ type: 'SET_OPEN_INFO' });
            }}
            popupContent={t(translationBaseRoute + 'actions.info.btnTitle')}
            size="sm"
          >
            <FaInfoCircle />
          </IconButton>
          {row.original.measurement.hasAccessToMeasurement && (
            <GoToConsumptionIcon
              measurementUuid={row.original.measurement.uuid}
              incremental={row.original.measurement.incremental}
              type={row.original.measurement.type}
              shouldCompareMeasurements={false}
              openInNewTab={true}
              iconSize="sm"
            />
          )}
          {!isReadOnly && (
            <IconButton
              type="secondary"
              action={() => onRemoveMeasurement(row.original)}
              popupContent={t(translationBaseRoute + 'actions.remove')}
              size="sm"
            >
              <RiDeleteBin6Fill />
            </IconButton>
          )}
        </ActionCell>
      );
    },
    [onRemoveMeasurement, t, translationBaseRoute, isReadOnly]
  );

  const columns = React.useMemo<ColumnDef<MeasurementWithConfig, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.measurement.displayName,
        header: t(translationBaseRoute + 'header.name'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.measurement.serialNumber,
        header: t(translationBaseRoute + 'header.serialNumber'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.measurement.timezone,
        header: t(translationBaseRoute + 'header.timezone'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.measurement.translatedMedium,
        header: t(translationBaseRoute + 'header.medium'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.measurement.type,
        header: t(translationBaseRoute + 'header.type'),
        cell: (info) =>
          getTranslationOptions({ t }).MEASUREMENT_TYPE.find(
            (option) => option.value === info.getValue()
          )?.label,
      },
      {
        accessorFn: (row) => row.measurement.locationName,
        header: t(translationBaseRoute + 'header.location'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.measurement.groupName,
        header: t(translationBaseRoute + 'header.group'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.measurement.tenants,
        header: t(translationBaseRoute + 'header.tenants'),
        cell: (info) => info.getValue(),
      },
      ...(enableCustomSort
        ? [
            {
              id: 'sort-arrows',
              accessorFn: (row: MeasurementWithConfig) => row.measurement.uuid,
              header: () => null,
              cell: ({ row }: { row: Row<MeasurementWithConfig> }) => (
                <CustomSortCell
                  rowIndex={row.index}
                  totalRows={selectedMeasurements.length}
                  onMove={(rowId, direction) =>
                    handleCustomSortMove(rowId, direction)
                  }
                  isDisable={isReadOnly}
                />
              ),
            },
          ]
        : []),
      {
        id: CONSTANTS.action,
        accessorFn: () => {},
        header: '',
        cell: ({ row }) => ActionCellFn(row),
      },
    ],
    [
      t,
      ActionCellFn,
      handleCustomSortMove,
      enableCustomSort,
      selectedMeasurements.length,
      isReadOnly,
    ]
  );

  return (
    <div>
      <div className="flex justify-between items-center p-4 ">
        {selectedMeasurements.length > 0 && (
          <div>
            <h1 className="text-2xl font-medium text-rhino-indigo-blue">
              {t(translationBaseRoute + 'title')}
            </h1>
          </div>
        )}

        {selectedMeasurements.length > 0 && onClearAll && !isReadOnly && (
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
            variant="compact"
            emptyText={t(translationBaseRoute + 'emptyMessage')}
          />
        </div>
      ) : (
        <div className="p-8 text-center" data-testid="measuremnt-empty">
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
      <MeasurementInfoModal
        modalProps={{
          opened: measurementInfoState.openInfo,
          onClose() {
            dispatch({ type: 'RESET' });
          },
        }}
        measurementUuid={measurementInfoState.selectedMeasurementUuid}
        dispatch={dispatch}
      />
    </div>
  );
};

export default MeasurementsWithActionsTable;
