import { PeriodicAlarmCreateReq } from '@rhino/apis';
import message from 'apps/webapp/src/components/notifier';
import { t } from 'i18next';
import { FieldErrors } from 'react-hook-form';
import {
  getEnumValues,
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
  PeriodicAlarmThresholdType,
} from '../../types';
import { PeriodicAlarmSchema } from '../validation';

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

export const onError = (errors: FieldErrors<PeriodicAlarmSchema>) => {
  if (Object.entries(errors).length > 3) {
    message.warn(t('toast.fieldsRequiredWarning', { ns: 'common' }));
    return;
  }

  Object.entries(errors).forEach(([, val]) => {
    if (
      'ref' in val &&
      val.ref &&
      'name' in val.ref &&
      val.ref.name === 'sharedTenants'
    )
      return;

    if (Array.isArray(val)) {
      val.forEach((item: { message: string }, i) => {
        message.warn(`${item.message} ${i + 1}`);
      });
    } else if (val?.message) {
      message.warn(val.message);
    }
  });
};

export const applyLabelTranslations = <T extends { label: string }>(
  options: T[]
) => {
  return options.map((option) => ({
    ...option,
    label: t(option.label, { ns: 'periodicAlarm' }),
  }));
};

export const buildCreateRequestForm = (
  values: PeriodicAlarmSchema
): PeriodicAlarmCreateReq => {
  return {
    name: values.name,
    clientUuid: values.clientUuid,
    meteringPointTypeId: values.meteringPointTypeId,
    measurementUuids: values.measurementUuids,
    configuration: {
      generationDay: values.generationDay ?? 1,
      generationTime: values.generationTime,
      delayInDays: values.delayInDays,
      comparisonMeasure: values.comparisonMeasure,
      thresholdType: values.thresholdType,
      ...(!!values.thresholdValue && {
        thresholdValue: values.thresholdValue,
      }),
      ...(!!values.thresholdStartValue && {
        thresholdStartValue: values.thresholdStartValue,
      }),
      ...(!!values.thresholdEndValue && {
        thresholdEndValue: values.thresholdEndValue,
      }),
      sendOnlyWhenExceeded: values.sendOnlyWhenExceeded,
    },
    ...((!!values.recipientEmails?.length || !!values.phoneNumber?.length) && {
      recipients: {
        ...(!!values.recipientEmails && { emails: values.recipientEmails }),
        ...(!!values.phoneNumber && { phoneNumbers: values.phoneNumber }),
      },
    }),
    frequency: values.frequency,
    shared: values.shared,
    readOnly: values.readOnly,
    active: values.isActive,
    timezone: values.timezone,
    ...(!!values.sharedLocations && {
      sharedLocalisationUuids: values.sharedLocations,
    }),
    ...(!!values.sharedTenants && {
      sharedTenantUuids: values.sharedTenants,
    }),
    compareWithPeriod: values.compareWithPeriod,
    analysePeriod: values.analysePeriod,
  };
};
