import { TFunction } from 'i18next';
import z from 'zod';
import {
  PeriodicAlarmCompareWith,
  PeriodicAlarmThresholdType,
} from '../../types';
import {
  shouldShowStartAndEndThresholdValue,
  shouldShowThresholdValue,
} from '../helper';

export const i18nBase = 'create.form.validation.';

const validateNumberFormat = (val: number | undefined) => {
  if (val === undefined) return true;
  const str = val.toString();
  const parts = str.split('.');
  const integerPart = parts[0].replace('-', '');
  const decimalPart = parts[1] || '';

  return integerPart.length <= 13 && decimalPart.length <= 6;
};

export const buildPeriodicAlarmSchema = (
  t: TFunction<'periodicAlarm', undefined>
) => {
  return z
    .object({
      name: z.string().min(1, t(i18nBase + 'name')),
      clientUuid: z.string().min(1, t(i18nBase + 'clientUuid')),
      meteringPointTypeId: z
        .number(t(i18nBase + 'meteringPointTypeId'))
        .nonnegative(t(i18nBase + 'meteringPointTypeId')),
      timezone: z
        .string(t(i18nBase + 'timezone'))
        .min(1, t(i18nBase + 'timezone')),
      frequency: z.string().min(1, t(i18nBase + 'frequency')),
      generationDay: z
        .number(t(i18nBase + 'generationDay'))
        .min(0, t(i18nBase + 'generationDay'))
        .nullable(),
      generationTime: z
        .string(t(i18nBase + 'generationTime'))
        .min(1, t(i18nBase + 'generationTime')),
      delayInDays: z
        .number(t(i18nBase + 'inValid'))
        .max(366, t(i18nBase + 'delayInDays')),
      analysePeriod: z.string().min(1, t(i18nBase + 'analysePeriod')),
      compareWithPeriod: z.string().min(1, t(i18nBase + 'compareWithPeriod')),
      comparisonMeasure: z.string().min(1, t(i18nBase + 'comparisonMeasure')),
      thresholdType: z
        .string(t(i18nBase + 'thresholdType'))
        .min(1, t(i18nBase + 'thresholdType')),
      thresholdValue: z
        .number(t(i18nBase + 'thresholdValue'))
        .refine(validateNumberFormat, {
          message: t(i18nBase + 'thresholdValue'),
        })
        .optional(),
      thresholdStartValue: z
        .number(t(i18nBase + 'thresholdStartValue'))
        .refine(validateNumberFormat, {
          message: t(i18nBase + 'thresholdStartValue'),
        })
        .optional(),
      thresholdEndValue: z
        .number(t(i18nBase + 'thresholdEndValue'))
        .refine(validateNumberFormat, {
          message: t(i18nBase + 'thresholdEndValue'),
        })
        .optional(),
      isActive: z.boolean(),
      shared: z.boolean(),
      readOnly: z.boolean(),
      sharedLocations: z.array(z.string()),
      sharedTenants: z.array(z.string()),
      recipientEmails: z.array(z.email(t(i18nBase + 'recipients'))).optional(),
      phoneNumber: z
        .array(z.string().regex(/^\+\d{11,15}$/, t(i18nBase + 'phoneNumber')))
        .optional(),
      measurementUuids: z
        .array(z.string())
        .nonempty(t(i18nBase + 'measurementUuids')),
      sendOnlyWhenExceeded: z.boolean(),
    })
    .refine(
      (data) => {
        if (data.shared) {
          return (
            data.sharedLocations.length > 0 || data.sharedTenants.length > 0
          );
        }
        return true;
      },
      {
        message: t(i18nBase + 'shared'),
        path: ['sharedLocations'],
      }
    )
    .refine(
      (data) => {
        if (data.shared) {
          return (
            data.sharedLocations.length > 0 || data.sharedTenants.length > 0
          );
        }
        return true;
      },
      {
        message: t(i18nBase + 'shared'),
        path: ['sharedTenants'],
      }
    )
    .refine(
      (data) => {
        if (data.compareWithPeriod) {
          return data.thresholdType.trim().length > 0;
        }
        return true;
      },
      {
        message: t(i18nBase + 'thresholdType'),
        path: ['thresholdType'],
      }
    )
    .refine(
      (data) => {
        if (data.frequency === 'DAILY') {
          return true;
        }
        return data.generationDay !== null;
      },
      {
        message: t(i18nBase + 'generationDay'),
        path: ['generationDay'],
      }
    )
    .refine(
      (data) => {
        const _shouldShowThresholdValue = shouldShowThresholdValue(
          data.compareWithPeriod as PeriodicAlarmCompareWith,
          data.thresholdType as PeriodicAlarmThresholdType
        );
        if (_shouldShowThresholdValue) {
          return (
            data.thresholdValue !== undefined && data.thresholdValue !== null
          );
        }
        return true;
      },
      {
        message: t(i18nBase + 'thresholdValue'),
        path: ['thresholdValue'],
      }
    )
    .refine(
      (data) => {
        const shouldShowStartEndFields = shouldShowStartAndEndThresholdValue(
          data.thresholdType as PeriodicAlarmThresholdType
        );
        if (shouldShowStartEndFields) {
          return (
            data.thresholdStartValue !== null &&
            data.thresholdStartValue !== undefined
          );
        }
        return true;
      },
      {
        message: t(i18nBase + 'thresholdStartValue'),
        path: ['thresholdStartValue'],
      }
    )
    .refine(
      (data) => {
        const shouldShowStartEndFields = shouldShowStartAndEndThresholdValue(
          data.thresholdType as PeriodicAlarmThresholdType
        );
        if (shouldShowStartEndFields) {
          return (
            data.thresholdEndValue !== null &&
            data.thresholdEndValue !== undefined
          );
        }
        return true;
      },
      {
        message: t(i18nBase + 'thresholdEndValue'),
        path: ['thresholdEndValue'],
      }
    )
    .refine(
      (data) => {
        const shouldShowStartEndFields = shouldShowStartAndEndThresholdValue(
          data.thresholdType as PeriodicAlarmThresholdType
        );

        if (data.thresholdStartValue && data.thresholdEndValue) {
          if (
            shouldShowStartEndFields &&
            data.thresholdStartValue >= data.thresholdEndValue
          ) {
            return false;
          }
        }
        return true;
      },
      {
        message: t(i18nBase + 'thresholdValueOutOfRange'),
        path: ['thresholdStartValue'],
      }
    )
    .refine(
      (data) => {
        const shouldShowStartEndFields = shouldShowStartAndEndThresholdValue(
          data.thresholdType as PeriodicAlarmThresholdType
        );

        if (data.thresholdStartValue && data.thresholdEndValue) {
          if (
            shouldShowStartEndFields &&
            data.thresholdStartValue >= data.thresholdEndValue
          ) {
            return false;
          }
        }
        return true;
      },
      {
        message: t(i18nBase + 'thresholdValueOutOfRange'),
        path: ['thresholdEndValue'],
      }
    );
};

export type PeriodicAlarmSchema = z.infer<
  ReturnType<typeof buildPeriodicAlarmSchema>
>;
