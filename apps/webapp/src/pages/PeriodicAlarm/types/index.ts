import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { PeriodicAlarmSchema } from '../Create/validation';

// React Hook Form Props
export type RHFInputProps = {
  register: UseFormRegister<PeriodicAlarmSchema>;
  control: Control<PeriodicAlarmSchema>;
  trigger: UseFormTrigger<PeriodicAlarmSchema>;
  setValue: UseFormSetValue<PeriodicAlarmSchema>;
  getValues: UseFormGetValues<PeriodicAlarmSchema>;
  watch: UseFormWatch<PeriodicAlarmSchema>;
  errors: FieldErrors<PeriodicAlarmSchema>;
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
