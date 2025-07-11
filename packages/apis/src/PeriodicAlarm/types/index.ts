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
