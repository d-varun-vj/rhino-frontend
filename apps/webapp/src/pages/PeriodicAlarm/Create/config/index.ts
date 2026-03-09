import { Languages } from '@rhino/apis';
import {
  ComparisonMethod,
  DataRange,
  MeasurementSortDirection,
  MeasurementSortOrder,
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
  PeriodicAlarmThresholdType,
} from '../../types';

export const tConfigBase = 'config.';
export const tFormBase = 'create.form.';

const T_COMPARE_WITH: Record<PeriodicAlarmCompareWith, string> = {
  FIXED_VALUE: tConfigBase + 'compareWith.fixedValue',
  DAY_BEFORE: tConfigBase + 'compareWith.dayBefore',
  WEEK_BEFORE: tConfigBase + 'compareWith.weekBefore',
  MONTH_BEFORE: tConfigBase + 'compareWith.monthBefore',
  QUARTER_BEFORE: tConfigBase + 'compareWith.quarterBefore',
  YEAR_BEFORE: tConfigBase + 'compareWith.yearBefore',
  SAME_DAY_YEAR_BEFORE: tConfigBase + 'compareWith.sameDayYearBefore',
  SAME_WEEK_YEAR_BEFORE: tConfigBase + 'compareWith.sameWeekYearBefore',
  SAME_MONTH_YEAR_BEFORE: tConfigBase + 'compareWith.sameMonthYearBefore',
  SAME_QUARTER_YEAR_BEFORE: tConfigBase + 'compareWith.sameQuarterYearBefore',
  SAME_DAY_MONTH_BEFORE: tConfigBase + 'compareWith.sameDayMonthBefore',
  SAME_DAY_LAST_WEEK: tConfigBase + 'compareWith.sameDayLastWeek',
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

export const COMPARISON_METHOD_OPTIONS: {
  label: string;
  value: ComparisonMethod;
}[] = [
  {
    label: tConfigBase + 'comparisonMethod.totalConsumption',
    value: ComparisonMethod.TOTAL_CONSUMPTION,
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

export const WEEK_DAY_OPTIONS: {
  label: string;
  id: number;
}[] = [
  {
    label: tConfigBase + 'weekDay.mon',
    id: 1,
  },
  {
    label: tConfigBase + 'weekDay.tue',
    id: 2,
  },
  {
    label: tConfigBase + 'weekDay.wed',
    id: 3,
  },
  {
    label: tConfigBase + 'weekDay.thu',
    id: 4,
  },
  {
    label: tConfigBase + 'weekDay.fri',
    id: 5,
  },
  {
    label: tConfigBase + 'weekDay.sat',
    id: 6,
  },
  {
    label: tConfigBase + 'weekDay.sun',
    id: 7,
  },
];

export const LANGUAGES: { label: string; id: Languages }[] = [
  {
    id: Languages.EN,
    label: 'EN',
  },
  {
    id: Languages.PL,
    label: 'PL',
  },
];

export const DATA_RANGE_OPTIONS: {
  label: string;
  value: DataRange;
}[] = [
  {
    label: tConfigBase + 'dataRange.yesterday',
    value: DataRange.YESTERDAY,
  },
  {
    label: tConfigBase + 'dataRange.lastWeek',
    value: DataRange.LAST_WEEK,
  },
  {
    label: tConfigBase + 'dataRange.lastMonth',
    value: DataRange.LAST_MONTH,
  },
  {
    label: tConfigBase + 'dataRange.lastQuarter',
    value: DataRange.LAST_QUARTER,
  },
  {
    label: tConfigBase + 'dataRange.lastYear',
    value: DataRange.LAST_YEAR,
  },
];

export const VALID_ANALYSE_COMPARE_COMBINATIONS: Record<
  DataRange,
  {
    default: PeriodicAlarmCompareWith;
    allowed: {
      label: string;
      value: PeriodicAlarmCompareWith;
    }[];
  }
> = {
  YESTERDAY: {
    default: PeriodicAlarmCompareWith.FIXED_VALUE,
    allowed: [
      {
        label: T_COMPARE_WITH.FIXED_VALUE,
        value: PeriodicAlarmCompareWith.FIXED_VALUE,
      },
      {
        label: T_COMPARE_WITH.DAY_BEFORE,
        value: PeriodicAlarmCompareWith.DAY_BEFORE,
      },
      {
        label: T_COMPARE_WITH.SAME_DAY_LAST_WEEK,
        value: PeriodicAlarmCompareWith.SAME_DAY_LAST_WEEK,
      },
      {
        label: T_COMPARE_WITH.SAME_DAY_MONTH_BEFORE,
        value: PeriodicAlarmCompareWith.SAME_DAY_MONTH_BEFORE,
      },
      {
        label: T_COMPARE_WITH.SAME_DAY_YEAR_BEFORE,
        value: PeriodicAlarmCompareWith.SAME_DAY_YEAR_BEFORE,
      },
    ],
  },
  LAST_WEEK: {
    default: PeriodicAlarmCompareWith.FIXED_VALUE,
    allowed: [
      {
        label: T_COMPARE_WITH.FIXED_VALUE,
        value: PeriodicAlarmCompareWith.FIXED_VALUE,
      },
      {
        label: T_COMPARE_WITH.WEEK_BEFORE,
        value: PeriodicAlarmCompareWith.WEEK_BEFORE,
      },
      {
        label: T_COMPARE_WITH.SAME_WEEK_YEAR_BEFORE,
        value: PeriodicAlarmCompareWith.SAME_WEEK_YEAR_BEFORE,
      },
    ],
  },
  LAST_MONTH: {
    default: PeriodicAlarmCompareWith.FIXED_VALUE,
    allowed: [
      {
        label: T_COMPARE_WITH.FIXED_VALUE,
        value: PeriodicAlarmCompareWith.FIXED_VALUE,
      },
      {
        label: T_COMPARE_WITH.MONTH_BEFORE,
        value: PeriodicAlarmCompareWith.MONTH_BEFORE,
      },
      {
        label: T_COMPARE_WITH.SAME_MONTH_YEAR_BEFORE,
        value: PeriodicAlarmCompareWith.SAME_MONTH_YEAR_BEFORE,
      },
    ],
  },
  LAST_QUARTER: {
    default: PeriodicAlarmCompareWith.FIXED_VALUE,
    allowed: [
      {
        label: T_COMPARE_WITH.FIXED_VALUE,
        value: PeriodicAlarmCompareWith.FIXED_VALUE,
      },
      {
        label: T_COMPARE_WITH.QUARTER_BEFORE,
        value: PeriodicAlarmCompareWith.QUARTER_BEFORE,
      },
      {
        label: T_COMPARE_WITH.SAME_QUARTER_YEAR_BEFORE,
        value: PeriodicAlarmCompareWith.SAME_QUARTER_YEAR_BEFORE,
      },
    ],
  },
  LAST_YEAR: {
    default: PeriodicAlarmCompareWith.FIXED_VALUE,
    allowed: [
      {
        label: T_COMPARE_WITH.FIXED_VALUE,
        value: PeriodicAlarmCompareWith.FIXED_VALUE,
      },
      {
        label: T_COMPARE_WITH.YEAR_BEFORE,
        value: PeriodicAlarmCompareWith.YEAR_BEFORE,
      },
    ],
  },
};

export const VALID_THRESHOLD_OPTIONS: Record<
  PeriodicAlarmCompareWith.FIXED_VALUE | 'OTHERS',
  {
    label: string;
    value: PeriodicAlarmThresholdType;
  }[]
> = {
  FIXED_VALUE: [
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
      label: TRANSLATION_KEY_FOR_THRESHOLD.ABOVE,
      value: PeriodicAlarmThresholdType.ABOVE,
    },
    {
      label: TRANSLATION_KEY_FOR_THRESHOLD.BELOW,
      value: PeriodicAlarmThresholdType.BELOW,
    },
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
    min: 1,
    max: 1,
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

export const SORT_BY_OPTIONS: {
  label: string;
  value: MeasurementSortOrder;
}[] = [
  {
    label: tConfigBase + 'sortOrder.consumption',
    value: MeasurementSortOrder.BY_CONSUMPTION,
  },
  {
    label: tConfigBase + 'sortOrder.consumptionChange',
    value: MeasurementSortOrder.BY_CONSUMPTION_CHANGE,
  },
  {
    label: tConfigBase + 'sortOrder.measurementName',
    value: MeasurementSortOrder.BY_MEASUREMENT_NAME,
  },
  {
    label: tConfigBase + 'sortOrder.location',
    value: MeasurementSortOrder.BY_LOCATION,
  },
  {
    label: tConfigBase + 'sortOrder.custom',
    value: MeasurementSortOrder.CUSTOM,
  },
];

export const SORT_DIRECTION_OPTIONS: {
  label: string;
  value: MeasurementSortDirection;
}[] = [
  {
    label: tConfigBase + 'sortDirection.asc',
    value: MeasurementSortDirection.ASC,
  },
  {
    label: tConfigBase + 'sortDirection.desc',
    value: MeasurementSortDirection.DESC,
  },
];
