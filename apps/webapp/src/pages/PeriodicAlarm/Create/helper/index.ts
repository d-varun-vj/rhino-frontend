import { t } from 'i18next';
import {
  getEnumValues,
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
  PeriodicAlarmThresholdType,
} from '../../types';

export const shouldShowGenerationDay = (frequency: PeriodicAlarmFrequency) => {
  return ![PeriodicAlarmFrequency.DAILY].includes(frequency);
};

export const shouldShowThresholdValue = (
  compareWith: PeriodicAlarmCompareWith,
  thresholdType: PeriodicAlarmThresholdType
) => {
  const isValidComparison = getEnumValues(PeriodicAlarmCompareWith).includes(
    compareWith
  );
  if (!compareWith || !thresholdType || !isValidComparison) return false;

  if (compareWith === PeriodicAlarmCompareWith.CONSTANT) {
    return [
      PeriodicAlarmThresholdType.ABOVE,
      PeriodicAlarmThresholdType.BELOW,
      PeriodicAlarmThresholdType.EQUAL,
    ].includes(thresholdType);
  }
  return [
    PeriodicAlarmThresholdType.ABOVE_PERCENT,
    PeriodicAlarmThresholdType.BELOW_PERCENT,
  ].includes(thresholdType);
};

export const shouldShowStartAndEndThresholdValue = (
  thresholdType: PeriodicAlarmThresholdType
) => {
  if (!thresholdType) return false;

  return [
    PeriodicAlarmThresholdType.BETWEEN,
    PeriodicAlarmThresholdType.BEYOND,
    PeriodicAlarmThresholdType.BETWEEN_PERCENT,
    PeriodicAlarmThresholdType.BEYOND_PERCENT,
  ].includes(thresholdType);
};

export const applyLabelTranslations = <T extends { label: string }>(
  options: T[]
) => {
  return options.map((option) => ({
    ...option,
    label: t(option.label, { ns: 'periodicAlarm' }),
  }));
};
