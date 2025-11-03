export type ExecutionStateProps = {
  openExecution: boolean;
  selectedAlarmUuid: string;
  selectedAlarmName: string;
};

export type SelectedMediumType = {
  mappId: number | null;
  name: string | null;
  unit: string | null;
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

export enum DataRange {
  YESTERDAY = 'YESTERDAY',
  LAST_WEEK = 'LAST_WEEK',
  LAST_MONTH = 'LAST_MONTH',
  LAST_QUARTER = 'LAST_QUARTER',
  LAST_YEAR = 'LAST_YEAR',
}

export enum PeriodicAlarmCompareWith {
  FIXED_VALUE = 'FIXED_VALUE',
  DAY_BEFORE = 'DAY_BEFORE',
  WEEK_BEFORE = 'WEEK_BEFORE',
  MONTH_BEFORE = 'MONTH_BEFORE',
  QUARTER_BEFORE = 'QUARTER_BEFORE',
  YEAR_BEFORE = 'YEAR_BEFORE',
  SAME_DAY_LAST_WEEK = 'SAME_DAY_LAST_WEEK',
  SAME_DAY_MONTH_BEFORE = 'SAME_DAY_MONTH_BEFORE',
  SAME_DAY_YEAR_BEFORE = 'SAME_DAY_YEAR_BEFORE',
  SAME_WEEK_YEAR_BEFORE = 'SAME_WEEK_YEAR_BEFORE',
  SAME_MONTH_YEAR_BEFORE = 'SAME_MONTH_YEAR_BEFORE',
  SAME_QUARTER_YEAR_BEFORE = 'SAME_QUARTER_YEAR_BEFORE',
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

export enum ComparisonMethod {
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
