export type MeasurementWithConfig = {
  measurement: {
    uuid: string;
  };
};

export type CreateMeasurementDraft<T extends MeasurementWithConfig> = {
  clientUuid: string | null;
  measurements: T[];
};

export type UpdateMeasurementChanges<T extends MeasurementWithConfig> = {
  alarmUuid: string;
  addedMeasurements: T[];
  removedUuids: string[];
  orderedUuids?: string[];
};
