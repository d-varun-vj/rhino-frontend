import MultiTextField from 'apps/webapp/src/components/common/input/MultiTextField';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RHFInputProps } from '../../../types';
import { tFormBase } from '../../config';
import SectionWrapper from '../SectionWrapper';

const RecipientDetails = ({ control, errors }: RHFInputProps) => {
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
          render={({ field }) => (
            <MultiTextField
              {...field}
              label={t(tFormBase + 'recipient.email.title')}
              placeholder={t(tFormBase + 'recipient.email.placeholder')}
              onChange={(val) => field.onChange(val)}
              error={!!errors.recipientEmails}
            />
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <MultiTextField
              {...field}
              label={t(tFormBase + 'recipient.sms.title')}
              placeholder={t(tFormBase + 'recipient.sms.placeholder')}
              onChange={(val) => field.onChange(val)}
              error={!!errors.phoneNumber}
            />
          )}
        />
      </div>
    </SectionWrapper>
  );
};

export default RecipientDetails;
