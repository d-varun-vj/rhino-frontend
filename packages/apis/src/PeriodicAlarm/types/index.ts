import { Sort } from '@rhino/utils';
import { ClientInfo } from '../../Clients';
import { MeteringPointTypes } from '../../Common/types';
import { Location } from '../../Locations';
import { MeasurementType } from '../../Measurement/types';

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
  recipients?: {
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

export type PeriodicAlarmExecutionParam = {
  page: number | null;
  size: number | null;
  sort: Sort;
  uuid: string;
  startDate: string | null;
  endDate: string | null;
  executionStatus: string | null;
  status?: string;
};

export type PeriodicAlarmExecution = {
  uuid: string;
  occurence: string;
  startRange: string | null;
  endRange: string | null;
  executionStatus: string;
  status: string;
  downloadPath: string | null;
  timeRange?: string;
  action?: string;
};

export type PeriodicAlarmUpdateReq = {
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
    timezone: string;
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
  sharedLocalisationUuids?: string[];
  sharedTenantUuids?: string[];
  compareWithPeriod: string;
  analysePeriod: string;
};

export interface PeriodicAlarmDetail {
  id: number;
  uuid: string;
  name: string;
  client: ClientInfo;
  meteringPointTypeDto: MeteringPointTypes;
  measurements: MeasurementType[];
  configuration: {
    generationTime: string;
    delayInDays: number;
    generationDay?: number;
    comparisonMeasure: string;
    thresholdType: string;
    thresholdStartValue?: number;
    thresholdEndValue?: number;
    thresholdValue?: number | null;
    sendOnlyWhenExceeded: boolean;
    timezone: string;
  };
  recipientDetails: {
    emails?: string[];
    phoneNumbers?: string[];
  };
  frequency: string;
  shared: boolean;
  readOnly: boolean;
  active: boolean;
  userUuid: string;
  editorUuid: string | null;
  sharedLocalisations: Location[];
  sharedTenants: {
    id: number;
    uuid: string;
    displayName: string;
    leaseNumber: string;
    groupName: string;
    localizationName: string;
  }[];
  compareWithPeriod: string;
  analysePeriod: string;
  nextExecutionTime: string;
}
