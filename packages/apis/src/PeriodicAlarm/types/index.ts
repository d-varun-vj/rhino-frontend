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

export const periodicAlarmFrequencyOptions = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'QUARTERLY',
  'YEARLY',
];
