export type MeasurementInfoStateProps = {
  openInfo: boolean;
  selectedMeasurementUuid: string;
};

export type MeasurementInfoActionProps =
  | { type: 'SET_OPEN_INFO' }
  | { type: 'SET_MEAUREMENT_UUID'; payload: string }
  | { type: 'RESET' };
