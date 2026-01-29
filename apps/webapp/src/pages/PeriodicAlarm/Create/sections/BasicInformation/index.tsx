import { Controller, useFormContext } from 'react-hook-form';

import TextField from 'apps/webapp/src/components/common/input/TextField';
import Toggle from 'apps/webapp/src/components/common/input/Toggle';
import SharingSection from 'apps/webapp/src/components/shared/SharingSection';
import { useTranslation } from 'react-i18next';
import { tFormBase } from '../../config';
import { PeriodicAlarmSchema } from '../../validation';
import SectionWrapper from '../SectionWrapper';

interface BasicInformationProps {
  isReadOnly?: boolean;
  hasCreatorAccess?: boolean;
  isUpdate?: boolean;
}

const BasicInformation = ({
  isReadOnly = false,
  hasCreatorAccess = true,
  isUpdate = false,
}: BasicInformationProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');

  const ActiveToggle = () => (
    <div className="flex">
      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <Toggle
            label={t(tFormBase + 'basic.active')}
            checked={field.value}
            onChange={(e) => field.onChange(e.currentTarget.checked)}
            onBlur={field.onBlur}
            activeColor="var(--color-rhino-indigo-blue)"
            disabled={isReadOnly}
          />
        )}
      />
    </div>
  );

  return (
    <SectionWrapper title={t(tFormBase + 'basic.title')} id="basic-information">
      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        <TextField
          label={t(tFormBase + 'basic.alarmName')}
          required
          {...(register && { ...register('name') })}
          error={errors.name?.message}
          disabled={isReadOnly}
          dataTestIdPrefix="name"
        />
        <TextField
          label={t(tFormBase + 'basic.alarmShortName')}
          required
          {...(register && { ...register('shortName') })}
          error={errors.shortName?.message}
          disabled={isReadOnly}
          dataTestIdPrefix="short-name"
        />
      </div>
      {hasCreatorAccess ? (
        <SharingSection
          label={t(tFormBase + 'basic.shared')}
          isReadOnly={isReadOnly}
          mode={isUpdate ? 'update' : 'create'}
        >
          <ActiveToggle />
        </SharingSection>
      ) : (
        <ActiveToggle />
      )}
    </SectionWrapper>
  );
};

export default BasicInformation;
