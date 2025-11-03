import { Sort } from '@rhino/utils';
import { ClientInfo } from '../../Clients';
import { AuditInfo } from '../../Common/types';
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
  isManageable?: boolean;
  showExecutionButton?: boolean;
  hasCreatorAccess?: boolean;
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

export type PeriodicAlarmReq = {
  name: string;
  shortName: string;
  clientUuid: string;
  measurementUuids: string[];
  configuration: {
    generationDay?: number;
    generationTime: string;
    delayInDays: number;
    comparisonMethod: string;
    thresholdType: string;
    thresholdValue?: number | null;
    thresholdStartValue?: number | null;
    thresholdEndValue?: number | null;
    sendOnlyWhenExceeded: boolean;
    language: string;
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
  dataRange: string;
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

export interface PeriodicAlarmDetail {
  id: number;
  uuid: string;
  name: string;
  shortName: string;
  client: ClientInfo;
  measurements: MeasurementType[];
  configuration: {
    generationTime: string;
    delayInDays: number;
    generationDay?: number;
    comparisonMethod: string;
    thresholdType: string;
    thresholdStartValue?: number | null;
    thresholdEndValue?: number | null;
    thresholdValue?: number | null;
    sendOnlyWhenExceeded: boolean;
    language: string;
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
  dataRange: string;
  nextExecutionTime: string;
  isManageable: boolean;
  hasCreatorAccess: boolean;
  timezone: string;
  auditInfo: AuditInfo;
}
