import FloatingSelector from 'apps/webapp/src/components/common/comboboxes/FloatingSelector';
import QuestionCircle from 'apps/webapp/src/components/common/indicators/QuestionCircle';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PeriodicAlarmPeriod, RHFInputProps } from '../../../types';
import {
  ANALYSE_PERIOD_OPTIONS,
  tFormBase,
  VALID_FREQUENCY_ANALYSIS_PERIOD_COMBINATIONS,
} from '../../config';
import { applyLabelTranslations } from '../../helper';
import SectionWrapper from '../SectionWrapper';

const TimeConfiguration = ({
  control,
  watch,
  setValue,
  resetThresholdValues,
}: RHFInputProps & {
  resetThresholdValues: () => void;
}) => {
  const { t } = useTranslation('periodicAlarm');
  const selectedFrequency = watch('frequency') || 'DAILY';

  const filteredAnalysisPeriodOptions = useMemo(() => {
    const validOptionMap =
      VALID_FREQUENCY_ANALYSIS_PERIOD_COMBINATIONS[
        selectedFrequency as keyof typeof VALID_FREQUENCY_ANALYSIS_PERIOD_COMBINATIONS
      ];

    if (validOptionMap) {
      const defaultAnalysisPeriod = validOptionMap.default;
      setValue('analysePeriod', defaultAnalysisPeriod);

      return ANALYSE_PERIOD_OPTIONS.map((option) => ({
        ...option,
        disabled: !validOptionMap.allowed.includes(option.id),
      }));
    }

    return ANALYSE_PERIOD_OPTIONS.map((option) => ({
      ...option,
      disabled: true,
    }));
  }, [selectedFrequency, setValue]);

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
              error={!!fieldState.error}
            />
          )}
        />
        <QuestionCircle
          content={t(tFormBase + 'timeConfiguration.analysisPeriod.guide')}
          className="mt-6"
        />
      </div>
    </SectionWrapper>
  );
};

export default TimeConfiguration;
