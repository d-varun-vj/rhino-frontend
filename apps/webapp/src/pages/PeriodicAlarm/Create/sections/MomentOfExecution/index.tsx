import { Controller, useFormContext } from 'react-hook-form';
import {
  FREQUENCY_OPTIONS,
  VALID_GENERATION_DAY_CONFIG,
  tFormBase,
} from '../../config';
import { applyLabelTranslations, shouldShowGenerationDay } from '../../helper';

import FloatingSelector from 'apps/webapp/src/components/common/comboboxes/FloatingSelector';
import CustomTimePicker from 'apps/webapp/src/components/common/datetime/CustomTimePicker';
import QuestionCircle from 'apps/webapp/src/components/common/indicators/QuestionCircle';
import NumberField from 'apps/webapp/src/components/common/input/NumberField';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
} from '../../../types';
import { PeriodicAlarmSchema } from '../../validation';
import SectionWrapper from '../SectionWrapper';

interface MomentOfExecutionProps {
  resetThresholdValues: () => void;
  isReadOnly?: boolean;
}

const MomentOfExecution = ({
  resetThresholdValues,
  isReadOnly = false,
}: MomentOfExecutionProps) => {
  const { control, watch, setValue } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');
  const selectedFrequency =
    (watch('frequency') as PeriodicAlarmFrequency) ||
    PeriodicAlarmFrequency.DAILY;

  const generationDayConfigByFrequency = useMemo(() => {
    return VALID_GENERATION_DAY_CONFIG[selectedFrequency];
  }, [selectedFrequency]);

  return (
    <SectionWrapper
      title={t(tFormBase + 'momentOfExecution.title')}
      id="moment-of-execution"
    >
      <div className="flex flex-col gap-5">
        <Controller
          name={'frequency'}
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <FloatingSelector
              label={t(tFormBase + 'momentOfExecution.frequency')}
              required
              data={applyLabelTranslations(FREQUENCY_OPTIONS)}
              onSelect={(frequency: string) => {
                field.onChange(frequency);
                setValue(
                  'compareWithPeriod',
                  PeriodicAlarmCompareWith.CONSTANT
                );
                setValue('generationDay', 1);
                resetThresholdValues();
              }}
              selectedValue={FREQUENCY_OPTIONS.find(
                (val) => val.id === (field.value as PeriodicAlarmFrequency)
              )}
              error={fieldState.error ? fieldState.error.message : ''}
              isReadOnly={isReadOnly}
            />
          )}
        />

        {shouldShowGenerationDay(selectedFrequency) && (
          <div className="grid grid-cols-2 items-center gap-4">
            <Controller
              name={'generationDay'}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <NumberField
                  label={t(tFormBase + 'momentOfExecution.generationDay.title')}
                  required
                  value={field.value ?? 1}
                  min={generationDayConfigByFrequency.min}
                  max={generationDayConfigByFrequency.max}
                  placeholder={t(generationDayConfigByFrequency.placeholder)}
                  allowDecimal={false}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error ? fieldState.error.message : ''}
                  disabled={isReadOnly}
                />
              )}
            />
            <QuestionCircle
              content={t(tFormBase + 'momentOfExecution.generationDay.guide')}
              className="mt-6"
            />
          </div>
        )}

        <div className="flex gap-4 items-center">
          <Controller
            name={'generationTime'}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <CustomTimePicker
                label={t(tFormBase + 'momentOfExecution.generationTime.title')}
                required
                minutesStep={5}
                value={field.value}
                onChange={(time: string) => {
                  field.onChange(time);
                }}
                onBlur={field.onBlur}
                error={fieldState.error ? fieldState.error.message : ''}
                disabled={isReadOnly}
              />
            )}
          />
          <QuestionCircle
            content={t(tFormBase + 'momentOfExecution.generationTime.guide')}
            className="mt-6"
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <Controller
            name={'delayInDays'}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumberField
                label={t(tFormBase + 'momentOfExecution.gapAnalysis.title')}
                required
                allowNegative={false}
                value={field.value ?? ''}
                onChange={field.onChange}
                allowDecimal={false}
                onBlur={field.onBlur}
                error={fieldState.error ? fieldState.error.message : ''}
                disabled={isReadOnly}
              />
            )}
          />
          <QuestionCircle
            content={t(tFormBase + 'momentOfExecution.gapAnalysis.guide')}
            className="mt-6"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MomentOfExecution;
