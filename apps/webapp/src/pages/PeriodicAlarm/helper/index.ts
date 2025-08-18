import { Namespace, TFunction } from 'i18next';
import { tConfigBase } from '../Create/config';
import {
  ExecutionStatus,
  PeriodicAlarmFrequency,
  PeriodicAlarmStatus,
} from '../types';

export const getTranslationOptions = <T extends Namespace>({
  t,
}: {
  t: TFunction<T, undefined>;
}): Record<
  'SHARED' | 'PERIODIC_ALARM_FREQUENCY_OPTIONS' | 'STATUS' | 'EXECUTION_STATUS',
  { label: string; value: string }[]
> => {
  return {
    SHARED: [
      {
        label: t('table.options.yes', { ns: 'common' }),
        value: 'Yes',
      },
      {
        label: t('table.options.no', { ns: 'common' }),
        value: 'No',
      },
    ],
    PERIODIC_ALARM_FREQUENCY_OPTIONS: [
      {
        label: t(tConfigBase + 'frequency.daily'),
        value: PeriodicAlarmFrequency.DAILY,
      },
      {
        label: t(tConfigBase + 'frequency.weekly'),
        value: PeriodicAlarmFrequency.WEEKLY,
      },
      {
        label: t(tConfigBase + 'frequency.monthly'),
        value: PeriodicAlarmFrequency.MONTHLY,
      },
      {
        label: t(tConfigBase + 'frequency.quarterly'),
        value: PeriodicAlarmFrequency.QUARTERLY,
      },
      {
        label: t(tConfigBase + 'frequency.yearly'),
        value: PeriodicAlarmFrequency.YEARLY,
      },
    ],
    STATUS: [
      {
        label: t(tConfigBase + 'status.pending'),
        value: PeriodicAlarmStatus.PENDING,
      },
      {
        label: t(tConfigBase + 'status.inProgress'),
        value: PeriodicAlarmStatus.IN_PROGRESS,
      },
      {
        label: t(tConfigBase + 'status.success'),
        value: PeriodicAlarmStatus.SUCCESS,
      },
      {
        label: t(tConfigBase + 'status.failure'),
        value: PeriodicAlarmStatus.FAILURE,
      },
    ],
    EXECUTION_STATUS: [
      {
        label: t(tConfigBase + 'executionStatus.noData'),
        value: ExecutionStatus.NO_DATA,
      },
      {
        label: t(tConfigBase + 'executionStatus.pending'),
        value: ExecutionStatus.PENDING,
      },
      {
        label: t(tConfigBase + 'executionStatus.ok'),
        value: ExecutionStatus.OK,
      },
      {
        label: t(tConfigBase + 'executionStatus.exceeded'),
        value: ExecutionStatus.EXCEEDED,
      },
      {
        label: t(tConfigBase + 'executionStatus.error'),
        value: ExecutionStatus.ERROR,
      },
    ],
  };
};
