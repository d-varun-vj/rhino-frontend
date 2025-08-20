import { MeasurementType } from '@rhino/apis';

export type MeasurementConfig = {
  startDate: string | null;
  endDate: string | null;
  selectionId: string | null;
};

export type MeasurementWithConfig = {
  measurement: MeasurementType;
  config: MeasurementConfig;
};

export type CustomFilter = {
  mediumMappId?: number | null;
};
