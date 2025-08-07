import {
  ComparisonMeasureType,
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
  PeriodicAlarmPeriod,
  PeriodicAlarmThresholdType,
  TimeZone,
} from '../../types';

const tConfigBase = 'config.';
export const tFormBase = 'create.form.';

const T_COMPARE_WITH = {
  CONST: tConfigBase + 'compareWith.const',
  PREV_DAY: tConfigBase + 'compareWith.prevDay',
  PREV_WEEK: tConfigBase + 'compareWith.prevWeek',
  PREV_MONTH: tConfigBase + 'compareWith.prevMonth',
  PREV_QUARTER: tConfigBase + 'compareWith.prevQuarter',
  PREV_YEAR: tConfigBase + 'compareWith.prevYear',
  PREV_YEAR_SAME_DAY: tConfigBase + 'compareWith.prevYearSameDay',
  PREV_YEAR_SAME_WEEK: tConfigBase + 'compareWith.prevYearSameWeek',
  PREV_YEAR_SAME_MONTH: tConfigBase + 'compareWith.prevYearSameMonth',
  PREV_YEAR_SAME_QUARTER: tConfigBase + 'compareWith.prevYearSameQuarter',
};

const TRANSLATION_KEY_FOR_THRESHOLD = {
  ABOVE: tConfigBase + 'threshold.above',
  BELOW: tConfigBase + 'threshold.below',
  EQUAL: tConfigBase + 'threshold.equal',
  BETWEEN: tConfigBase + 'threshold.between',
  BEYOND: tConfigBase + 'threshold.beyond',
  ABOVE_PERCENT: tConfigBase + 'threshold.abovePercent',
  BELOW_PERCENT: tConfigBase + 'threshold.belowPercent',
  BETWEEN_PERCENT: tConfigBase + 'threshold.betweenPercent',
  BEYOND_PERCENT: tConfigBase + 'threshold.beyondPercent',
};

export const SUPPORTED_TIMEZONES: { label: string; value: TimeZone }[] = [
  { label: 'Europe/Warsaw', value: TimeZone.EUROPE_WARSAW },
];

export const COMPARISON_MEASURE_TYPE_OPTIONS: {
  label: string;
  value: ComparisonMeasureType;
}[] = [
  {
    label: tConfigBase + 'measureType.totalConsumption',
    value: ComparisonMeasureType.TOTAL_CONSUMPTION,
  },
];

export const SIDE_STICKY_MENU_ITEMS: { label: string; id: string }[] = [
  { label: tFormBase + 'basic.title', id: 'basic-information' },
  {
    label: tFormBase + 'momentOfExecution.title',
    id: 'moment-of-execution',
  },
  {
    label: tFormBase + 'timeConfiguration.title',
    id: 'time-configuration',
  },
  {
    label: tFormBase + 'alarmCriteria.title',
    id: 'alarm-criteria',
  },
  {
    label: tFormBase + 'recipient.title',
    id: 'recipient-details',
  },
  {
    label: tFormBase + 'selectMeasurement',
    id: 'select-measurement',
  },
];

export const FREQUENCY_OPTIONS: {
  label: string;
  id: PeriodicAlarmFrequency;
}[] = [
  { label: tConfigBase + 'frequency.daily', id: PeriodicAlarmFrequency.DAILY },
  {
    label: tConfigBase + 'frequency.weekly',
    id: PeriodicAlarmFrequency.WEEKLY,
  },
  {
    label: tConfigBase + 'frequency.monthly',
    id: PeriodicAlarmFrequency.MONTHLY,
  },
  {
    label: tConfigBase + 'frequency.quarterly',
    id: PeriodicAlarmFrequency.QUARTERLY,
  },
  {
    label: tConfigBase + 'frequency.yearly',
    id: PeriodicAlarmFrequency.YEARLY,
  },
];

export const ANALYSE_PERIOD_OPTIONS: {
  label: string;
  id: PeriodicAlarmPeriod;
}[] = [
  {
    label: tConfigBase + 'analysisPeriod.lastDay',
    id: PeriodicAlarmPeriod.LAST_DAY,
  },
  {
    label: tConfigBase + 'analysisPeriod.lastWeek',
    id: PeriodicAlarmPeriod.LAST_WEEK,
  },
  {
    label: tConfigBase + 'analysisPeriod.lastMonth',
    id: PeriodicAlarmPeriod.LAST_MONTH,
  },
  {
    label: tConfigBase + 'analysisPeriod.lastQuarter',
    id: PeriodicAlarmPeriod.LAST_QUARTER,
  },
  {
    label: tConfigBase + 'analysisPeriod.lastYear',
    id: PeriodicAlarmPeriod.LAST_YEAR,
  },
];

export const VALID_FREQUENCY_ANALYSIS_PERIOD_COMBINATIONS: Record<
  PeriodicAlarmFrequency,
  { default: PeriodicAlarmPeriod; allowed: PeriodicAlarmPeriod[] }
> = {
  DAILY: {
    default: PeriodicAlarmPeriod.LAST_DAY,
    allowed: [PeriodicAlarmPeriod.LAST_DAY],
  },
  WEEKLY: {
    default: PeriodicAlarmPeriod.LAST_WEEK,
    allowed: [PeriodicAlarmPeriod.LAST_DAY, PeriodicAlarmPeriod.LAST_WEEK],
  },
  MONTHLY: {
    default: PeriodicAlarmPeriod.LAST_MONTH,
    allowed: [
      PeriodicAlarmPeriod.LAST_DAY,
      PeriodicAlarmPeriod.LAST_WEEK,
      PeriodicAlarmPeriod.LAST_MONTH,
    ],
  },
  QUARTERLY: {
    default: PeriodicAlarmPeriod.LAST_QUARTER,
    allowed: [
      PeriodicAlarmPeriod.LAST_DAY,
      PeriodicAlarmPeriod.LAST_WEEK,
      PeriodicAlarmPeriod.LAST_MONTH,
      PeriodicAlarmPeriod.LAST_QUARTER,
    ],
  },
  YEARLY: {
    default: PeriodicAlarmPeriod.LAST_YEAR,
    allowed: [
      PeriodicAlarmPeriod.LAST_DAY,
      PeriodicAlarmPeriod.LAST_WEEK,
      PeriodicAlarmPeriod.LAST_MONTH,
      PeriodicAlarmPeriod.LAST_QUARTER,
      PeriodicAlarmPeriod.LAST_YEAR,
    ],
  },
};

export const VALID_ANALYSE_COMPARE_COMBINATIONS: Record<
  PeriodicAlarmPeriod,
  {
    default: PeriodicAlarmPeriod;
    allowed: {
      label: string;
      value: PeriodicAlarmCompareWith;
    }[];
  }
> = {
  LAST_DAY: {
    default: PeriodicAlarmPeriod.LAST_DAY,
    allowed: [
      { label: T_COMPARE_WITH.CONST, value: PeriodicAlarmCompareWith.CONSTANT },
      {
        label: T_COMPARE_WITH.PREV_DAY,
        value: PeriodicAlarmCompareWith.PREV_DAY,
      },
    ],
  },
  LAST_WEEK: {
    default: PeriodicAlarmPeriod.LAST_WEEK,
    allowed: [
      { label: T_COMPARE_WITH.CONST, value: PeriodicAlarmCompareWith.CONSTANT },
      {
        label: T_COMPARE_WITH.PREV_WEEK,
        value: PeriodicAlarmCompareWith.PREV_WEEK,
      },
      {
        label: T_COMPARE_WITH.PREV_YEAR_SAME_WEEK,
        value: PeriodicAlarmCompareWith.PREV_YEAR_SAME_WEEK,
      },
    ],
  },
  LAST_MONTH: {
    default: PeriodicAlarmPeriod.LAST_MONTH,
    allowed: [
      { label: T_COMPARE_WITH.CONST, value: PeriodicAlarmCompareWith.CONSTANT },
      {
        label: T_COMPARE_WITH.PREV_MONTH,
        value: PeriodicAlarmCompareWith.PREV_MONTH,
      },
      {
        label: T_COMPARE_WITH.PREV_YEAR_SAME_MONTH,
        value: PeriodicAlarmCompareWith.PREV_YEAR_SAME_MONTH,
      },
    ],
  },
  LAST_QUARTER: {
    default: PeriodicAlarmPeriod.LAST_QUARTER,
    allowed: [
      { label: T_COMPARE_WITH.CONST, value: PeriodicAlarmCompareWith.CONSTANT },
      {
        label: T_COMPARE_WITH.PREV_QUARTER,
        value: PeriodicAlarmCompareWith.PREV_MONTH,
      },
      {
        label: T_COMPARE_WITH.PREV_YEAR_SAME_QUARTER,
        value: PeriodicAlarmCompareWith.PREV_YEAR_SAME_QUARTER,
      },
    ],
  },
  LAST_YEAR: {
    default: PeriodicAlarmPeriod.LAST_YEAR,
    allowed: [
      { label: T_COMPARE_WITH.CONST, value: PeriodicAlarmCompareWith.CONSTANT },
      {
        label: T_COMPARE_WITH.PREV_YEAR,
        value: PeriodicAlarmCompareWith.PREV_YEAR,
      },
    ],
  },
};

export const VALID_THRESHOLD_OPTIONS: Record<
  PeriodicAlarmCompareWith.CONSTANT | 'OTHERS',
  {
    label: string;
    value: PeriodicAlarmThresholdType;
  }[]
> = {
  CONSTANT: [
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.ABOVE,
      value: PeriodicAlarmThresholdType.ABOVE,
    },
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.BELOW,
      value: PeriodicAlarmThresholdType.BELOW,
    },
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.EQUAL,
      value: PeriodicAlarmThresholdType.EQUAL,
    },
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.BETWEEN,
      value: PeriodicAlarmThresholdType.BETWEEN,
    },
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.BEYOND,
      value: PeriodicAlarmThresholdType.BEYOND,
    },
  ],
  OTHERS: [
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.ABOVE_PERCENT,
      value: PeriodicAlarmThresholdType.ABOVE_PERCENT,
    },
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.BELOW_PERCENT,
      value: PeriodicAlarmThresholdType.BELOW_PERCENT,
    },
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.BETWEEN_PERCENT,
      value: PeriodicAlarmThresholdType.BETWEEN_PERCENT,
    },
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.BEYOND_PERCENT,
      value: PeriodicAlarmThresholdType.BEYOND_PERCENT,
    },
  ],
};

export const VALID_GENERATION_DAY_CONFIG: Record<
  PeriodicAlarmFrequency,
  {
    min: number;
    max: number;
    placeholder: string;
  }
> = {
  DAILY: {
    min: 0,
    max: 0,
    placeholder: '',
  },
  WEEKLY: {
    min: 1,
    max: 7,
    placeholder: tConfigBase + 'generationDay.placeholder.weekly',
  },
  MONTHLY: {
    min: 1,
    max: 31,
    placeholder: tConfigBase + 'generationDay.placeholder.monthly',
  },
  QUARTERLY: {
    min: 1,
    max: 92,
    placeholder: tConfigBase + 'generationDay.placeholder.quarterly',
  },
  YEARLY: {
    min: 1,
    max: 366,
    placeholder: tConfigBase + 'generationDay.placeholder.yearly',
  },
};
