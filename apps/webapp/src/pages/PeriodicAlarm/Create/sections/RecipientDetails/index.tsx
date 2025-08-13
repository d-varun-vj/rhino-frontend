import { Controller, useFormContext } from 'react-hook-form';
import { PeriodicAlarmSchema, i18nBase } from '../../validation';

import MultiTextField from 'apps/webapp/src/components/common/input/MultiTextField';
import { useTranslation } from 'react-i18next';
import { tFormBase } from '../../config';
import SectionWrapper from '../SectionWrapper';

interface RecipientDetailsProps {
  isReadOnly?: boolean;
}

const RecipientDetails = ({ isReadOnly = false }: RecipientDetailsProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');

  return (
    <SectionWrapper
      title={t(tFormBase + 'recipient.title')}
      id="recipient-details"
    >
      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        <Controller
          name="recipientEmails"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => {
            let errMessage = fieldState.error?.message;
            if (
              Array.isArray(errors.recipientEmails) &&
              errors.recipientEmails?.some(Boolean)
            ) {
              errMessage = t(i18nBase + 'recipients');
            }

            return (
              <MultiTextField
                {...field}
                label={t(tFormBase + 'recipient.email.title')}
                placeholder={t(tFormBase + 'recipient.email.placeholder')}
                onChange={(val) => field.onChange(val ?? '')}
                error={errMessage}
                disabled={isReadOnly}
              />
            );
          }}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => {
            let errMessage = fieldState.error?.message;
            if (
              Array.isArray(errors.phoneNumber) &&
              errors.phoneNumber?.some(Boolean)
            ) {
              errMessage = t(i18nBase + 'phoneNumber');
            }
            return (
              <MultiTextField
                {...field}
                label={t(tFormBase + 'recipient.sms.title')}
                placeholder={t(tFormBase + 'recipient.sms.placeholder')}
                onChange={(val) => field.onChange(val ?? '')}
                error={errMessage}
                disabled={isReadOnly}
              />
            );
          }}
        />
      </div>
    </SectionWrapper>
  );
};

export default RecipientDetails;
