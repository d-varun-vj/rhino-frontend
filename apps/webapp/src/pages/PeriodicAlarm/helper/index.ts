import { PeriodicAlarmReq } from '@rhino/apis';
import message from 'apps/webapp/src/components/notifier';
import { Namespace, t, TFunction } from 'i18next';
import { FieldErrors } from 'react-hook-form';
import { tConfigBase } from '../Create/config';
import { PeriodicAlarmSchema } from '../Create/validation';
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

export const buildPeriodicAlarmReqForm = (
  values: PeriodicAlarmSchema
): PeriodicAlarmReq => {
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
      ...(values.thresholdValue !== null &&
        values.thresholdValue !== undefined && {
          thresholdValue: values.thresholdValue,
        }),
      ...(values.thresholdStartValue !== null &&
        values.thresholdStartValue !== undefined && {
          thresholdStartValue: values.thresholdStartValue,
        }),
      ...(values.thresholdEndValue !== null &&
        values.thresholdEndValue !== undefined && {
          thresholdEndValue: values.thresholdEndValue,
        }),
      sendOnlyWhenExceeded: values.sendOnlyWhenExceeded,
      language: values.language,
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
