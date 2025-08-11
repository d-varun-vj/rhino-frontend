import { Namespace, TFunction } from 'i18next';
import { tConfigBase } from '../Create/config';
import { PeriodicAlarmFrequency } from '../types';

export const getTranslationOptions = <T extends Namespace>({
  t,
}: {
  t: TFunction<T, undefined>;
}): Record<
  'SHARED' | 'PERIODIC_ALARM_FREQUENCY_OPTIONS',
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
  };
};
