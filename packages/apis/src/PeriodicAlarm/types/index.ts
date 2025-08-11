export interface PeriodicAlarmType {
  id?: string;
  uuid: string;
  name: string;
  author: string;
  sharedLocations: string[];
  active: boolean;
  lastOccurrenceDate: string;
  shared: string;
  frequency?: string;
  isDeletable?: boolean;
  showExecutionButton?: boolean;
  action?: string;
}

export interface PeriodicAlarmFilter {
  name: string | null;
  author: string | null;
  location: string | null;
  active: boolean | null;
  frequency: string | null;
  shared: boolean | null;
}

export type PeriodicAlarmCreateReq = {
  name: string;
  clientUuid: string;
  meteringPointTypeId: number;
  measurementUuids: string[];
  configuration: {
    generationDay?: number;
    generationTime: string;
    delayInDays: number;
    comparisonMeasure: string;
    thresholdType: string;
    thresholdValue?: number;
    thresholdStartValue?: number;
    thresholdEndValue?: number;
    sendOnlyWhenExceeded: boolean;
  };
  recipients: {
    emails?: string[];
    phoneNumbers?: string[];
  };
  frequency: string;
  shared: boolean;
  readOnly: boolean;
  active: boolean;
  timezone: string;
  editorId?: string;
  sharedLocalisationUuids?: string[];
  sharedTenantUuids?: string[];
  compareWithPeriod: string;
  analysePeriod: string;
};
