import { ExecutionStatus } from '../../types';

export const STATUS_COLOUR: Record<ExecutionStatus | 'DEFAULT', string> = {
  ERROR: 'text-rhino-red',
  EXCEEDED: 'text-rhino-red',
  NO_DATA: 'text-rhino-red',
  OK: 'text-rhino-energy-green',
  PENDING: 'text-rhino-yellow',
  DEFAULT: 'text-rhino-grey',
};
