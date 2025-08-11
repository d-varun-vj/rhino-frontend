export type ExecutionStateProps = {
  openExecution: boolean;
  selectedAlarmUuid: string;
  selectedAlarmName: string;
};

export type ExecutionActionProps =
  | { type: 'SET_OPEN_EXECUTION' }
  | { type: 'SET_ALARM_UUID'; payload: string }
  | { type: 'SET_ALARM_NAME'; payload: string }
  | { type: 'RESET' };

export enum ExecutionStatus {
  ERROR = 'ERROR',
  NO_DATA = 'NO_DATA',
  EXCEEDED = 'EXCEEDED',
  OK = 'OK',
  PENDING = 'PENDING',
}

export enum PeriodicAlarmStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
}

export type ExecutionFilter = {
  executionStatus: ExecutionStatus | null;
  startDate: string | null;
  endDate: string | null;
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

export enum PeriodicAlarmFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export enum PeriodicAlarmPeriod {
  LAST_DAY = 'LAST_DAY',
  LAST_WEEK = 'LAST_WEEK',
  LAST_MONTH = 'LAST_MONTH',
  LAST_QUARTER = 'LAST_QUARTER',
  LAST_YEAR = 'LAST_YEAR',
}

export enum PeriodicAlarmCompareWith {
  CONSTANT = 'CONSTANT',
  PREV_DAY = 'PREV_DAY',
  PREV_WEEK = 'PREV_WEEK',
  PREV_MONTH = 'PREV_MONTH',
  PREV_QUARTER = 'PREV_QUARTER',
  PREV_YEAR = 'PREV_YEAR',
  PREV_YEAR_SAME_DAY = 'PREV_YEAR_SAME_DAY',
  PREV_YEAR_SAME_WEEK = 'PREV_YEAR_SAME_WEEK',
  PREV_YEAR_SAME_MONTH = 'PREV_YEAR_SAME_MONTH',
  PREV_YEAR_SAME_QUARTER = 'PREV_YEAR_SAME_QUARTER',
}

export enum PeriodicAlarmThresholdType {
  ABOVE = 'ABOVE',
  BELOW = 'BELOW',
  EQUAL = 'EQUAL',
  BETWEEN = 'BETWEEN',
  BEYOND = 'BEYOND',
  ABOVE_PERCENT = 'ABOVE_PERCENT',
  BELOW_PERCENT = 'BELOW_PERCENT',
  BETWEEN_PERCENT = 'BETWEEN_PERCENT',
  BEYOND_PERCENT = 'BEYOND_PERCENT',
}

export enum ComparisonMeasureType {
  TOTAL_CONSUMPTION = 'TOTAL_CONSUMPTION',
}

export enum TimeZone {
  EUROPE_WARSAW = 'Europe/Warsaw',
}

export const getEnumKeys = <T extends Record<string, string>>(
  enumObject: T
): (keyof T)[] => {
  return Object.keys(enumObject) as (keyof T)[];
};

export const getEnumValues = <T extends Record<string, string>>(
  enumObject: T
): T[keyof T][] => {
  return Object.values(enumObject) as T[keyof T][];
};
