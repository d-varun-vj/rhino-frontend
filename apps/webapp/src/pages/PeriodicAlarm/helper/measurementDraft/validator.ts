import {
  CreateMeasurementDraft,
  MeasurementWithConfig,
  UpdateMeasurementChanges,
} from './types';

export const isValidMeasurementWithConfig = (
  value: unknown
): value is MeasurementWithConfig => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;
  const measurementRecord = record.measurement as Record<string, unknown>;

  return typeof measurementRecord?.uuid === 'string';
};

export const isValidCreateMeasurementDraft = <T extends MeasurementWithConfig>(
  payload: unknown
): payload is CreateMeasurementDraft<T> => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const draft = payload as Record<string, unknown>;
  return (
    (draft.clientUuid === null || typeof draft.clientUuid === 'string') &&
    Array.isArray(draft.measurements) &&
    draft.measurements.every(isValidMeasurementWithConfig)
  );
};

export const isValidUpdateMeasurementChanges = <
  T extends MeasurementWithConfig,
>(
  payload: unknown
): payload is UpdateMeasurementChanges<T> => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const changes = payload as Record<string, unknown>;
  return (
    typeof changes.alarmUuid === 'string' &&
    Array.isArray(changes.addedMeasurements) &&
    changes.addedMeasurements.every(isValidMeasurementWithConfig) &&
    Array.isArray(changes.removedUuids) &&
    changes.removedUuids.every((uuid) => typeof uuid === 'string') &&
    (changes.orderedUuids === undefined ||
      (Array.isArray(changes.orderedUuids) &&
        changes.orderedUuids.every((uuid) => typeof uuid === 'string')))
  );
};
