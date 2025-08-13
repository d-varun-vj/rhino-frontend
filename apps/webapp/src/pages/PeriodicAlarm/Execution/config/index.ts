import { ExecutionStatus, PeriodicAlarmStatus } from '../../types';

export const EXECUTION_STATUS_COLOUR: Record<
  ExecutionStatus | 'DEFAULT',
  string
> = {
  ERROR: 'text-red-500',
  EXCEEDED: 'text-red-500',
  NO_DATA: 'text-red-500',
  OK: 'text-green-500',
  PENDING: 'text-amber-500',
  DEFAULT: 'text-gray-500',
};

export const STATUS_COLOUR: Record<PeriodicAlarmStatus | 'DEFAULT', string> = {
  FAILURE: 'text-red-500',
  SUCCESS: 'text-green-500',
  PENDING: 'text-amber-500',
  IN_PROGRESS: 'text-blue-500',
  DEFAULT: 'text-gray-500',
};
