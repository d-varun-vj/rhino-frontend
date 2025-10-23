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

  return integerPart.length <= 13 && decimalPart.length <= 2;
};

const validateBetweenNumbers = (
  startVal: number | undefined,
  endVal: number | undefined
): boolean => {
  if (startVal === undefined || endVal === undefined) return true;

  return startVal < endVal;
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
      language: z
        .string(t(i18nBase + 'language'))
        .min(1, t(i18nBase + 'language')),
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
        const thresholdType = data.thresholdType as PeriodicAlarmThresholdType;
        const shouldShow = shouldShowThresholdValue(
          data.compareWithPeriod as PeriodicAlarmCompareWith,
          thresholdType
        );

        if (!shouldShow) return true;

        const value = data.thresholdValue;

        if (value === null || value === undefined) return false;

        const isPercentType = [
          PeriodicAlarmThresholdType.ABOVE_PERCENT,
          PeriodicAlarmThresholdType.BELOW_PERCENT,
        ].includes(thresholdType);

        if (isPercentType && value < 0) return false;

        return true;
      },
      {
        message: t(i18nBase + 'thresholdValue'),
        path: ['thresholdValue'],
      }
    )
    .superRefine((data, ctx) => {
      const shouldShowStartEndFields = shouldShowStartAndEndThresholdValue(
        data.thresholdType as PeriodicAlarmThresholdType
      );

      if (
        shouldShowStartEndFields &&
        !validateBetweenNumbers(
          data.thresholdStartValue,
          data.thresholdEndValue
        )
      ) {
        ctx.addIssue({
          code: 'custom',
          message: t(i18nBase + 'thresholdValueOutOfRange'),
          path: ['thresholdStartValue'],
        });

        ctx.addIssue({
          code: 'custom',
          message: t(i18nBase + 'thresholdValueOutOfRange'),
          path: ['thresholdEndValue'],
        });
      }
    });
};

export type PeriodicAlarmSchema = z.infer<
  ReturnType<typeof buildPeriodicAlarmSchema>
>;
