import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  ANALYSE_PERIOD_OPTIONS,
  VALID_FREQUENCY_ANALYSIS_PERIOD_COMBINATIONS,
  tFormBase,
} from '../../config';

import FloatingSelector from 'apps/webapp/src/components/common/comboboxes/FloatingSelector';
import { useTranslation } from 'react-i18next';
import { PeriodicAlarmPeriod } from '../../../types';
import { applyLabelTranslations } from '../../helper';
import { PeriodicAlarmSchema } from '../../validation';
import SectionWrapper from '../SectionWrapper';

interface TimeConfigurationProps {
  resetThresholdValues: () => void;
  isReadOnly?: boolean;
}

const TimeConfiguration = ({
  resetThresholdValues,
  isReadOnly = false,
}: TimeConfigurationProps) => {
  const { control, watch, setValue } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');
  const selectedFrequency = watch('frequency') || 'DAILY';
  const validOptionMap =
    VALID_FREQUENCY_ANALYSIS_PERIOD_COMBINATIONS[
      selectedFrequency as keyof typeof VALID_FREQUENCY_ANALYSIS_PERIOD_COMBINATIONS
    ];

  const filteredAnalysisPeriodOptions = useMemo(() => {
    if (validOptionMap) {
      return ANALYSE_PERIOD_OPTIONS.map((option) => ({
        ...option,
        disabled: !validOptionMap.allowed.includes(option.id),
      }));
    }

    return ANALYSE_PERIOD_OPTIONS.map((option) => ({
      ...option,
      disabled: true,
    }));
  }, [validOptionMap]);

  useEffect(() => {
    if (validOptionMap?.default) {
      setValue('analysePeriod', validOptionMap.default);
    }
  }, [selectedFrequency, setValue, validOptionMap.default]);

  return (
    <SectionWrapper
      title={t(tFormBase + 'timeConfiguration.title')}
      id="time-configuration"
      className="gap-8"
    >
      <div className="flex gap-4 items-center">
        <Controller
          name={'analysePeriod'}
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <FloatingSelector
              key={`${selectedFrequency}-${field.value}`}
              label={t(tFormBase + 'timeConfiguration.analysisPeriod.title')}
              required
              data={applyLabelTranslations(filteredAnalysisPeriodOptions)}
              selectedValue={filteredAnalysisPeriodOptions.find(
                (val) => val.id === (field.value as PeriodicAlarmPeriod)
              )}
              onSelect={(period) => {
                field.onChange(period);
                resetThresholdValues();
              }}
              error={fieldState.error?.message}
              isReadOnly={isReadOnly}
            />
          )}
        />
        {/* <QuestionCircle
          content={t(tFormBase + 'timeConfiguration.analysisPeriod.guide')}
          className="mt-6"
        /> */}
      </div>
    </SectionWrapper>
  );
};

export default TimeConfiguration;
