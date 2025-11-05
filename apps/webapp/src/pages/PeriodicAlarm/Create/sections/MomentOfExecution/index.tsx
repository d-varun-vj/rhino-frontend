import { Controller, useFormContext } from 'react-hook-form';
import {
  FREQUENCY_OPTIONS,
  VALID_GENERATION_DAY_CONFIG,
  WEEK_DAY_OPTIONS,
  tFormBase,
} from '../../config';
import { applyLabelTranslations, shouldShowGenerationDay } from '../../helper';

import FloatingSelector from 'apps/webapp/src/components/common/comboboxes/FloatingSelector';
import QuestionCircle from 'apps/webapp/src/components/common/indicators/QuestionCircle';
import NumberField from 'apps/webapp/src/components/common/input/NumberField';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getValidFrequenciesForCombination } from '../../../helper';
import {
  DataRange,
  PeriodicAlarmCompareWith,
  PeriodicAlarmFrequency,
} from '../../../types';
import { PeriodicAlarmSchema } from '../../validation';
import SectionWrapper from '../SectionWrapper';

interface MomentOfExecutionProps {
  isReadOnly?: boolean;
}

const MomentOfExecution = ({ isReadOnly = false }: MomentOfExecutionProps) => {
  const { control, watch, setValue } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');
  const selectedFrequency = watch('frequency') as PeriodicAlarmFrequency;

  const selectedDataRange = watch('dataRange') as DataRange;
  const selectedCompareWith = watch(
    'compareWithPeriod'
  ) as PeriodicAlarmCompareWith;

  const generationDayConfigByFrequency = useMemo(() => {
    if (selectedFrequency)
      return VALID_GENERATION_DAY_CONFIG[selectedFrequency];
  }, [selectedFrequency]);

  const validFrequencyOptionMap = getValidFrequenciesForCombination(
    selectedDataRange,
    selectedCompareWith
  );

  const filteredfrequencyOptions = useMemo(() => {
    if (validFrequencyOptionMap) {
      const validOption = FREQUENCY_OPTIONS.map((option) => ({
        ...option,
        disabled: !validFrequencyOptionMap.allowed.includes(option.id),
      }));
      return validOption;
    }

    return FREQUENCY_OPTIONS.map((option) => ({
      ...option,
      disabled: true,
    }));
  }, [validFrequencyOptionMap]);

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
              key={`${selectedDataRange}-${selectedCompareWith}`}
              label={t(tFormBase + 'momentOfExecution.frequency')}
              required
              data={applyLabelTranslations(filteredfrequencyOptions)}
              onSelect={(frequency: string) => {
                field.onChange(frequency);
                setValue('generationDay', 1);
              }}
              selectedValue={filteredfrequencyOptions.find(
                (val) => val.id === (field.value as PeriodicAlarmFrequency)
              )}
              error={fieldState.error ? fieldState.error.message : ''}
              isReadOnly={isReadOnly}
              disabledTitle={
                !selectedDataRange
                  ? t(tFormBase + 'alarmCriteria.compareWith.emptyDataRange')
                  : ''
              }
            />
          )}
        />

        {selectedFrequency && shouldShowGenerationDay(selectedFrequency) && (
          <div className="grid grid-cols-2 items-center gap-4">
            {selectedFrequency === PeriodicAlarmFrequency.WEEKLY ? (
              <Controller
                name={'generationDay'}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FloatingSelector
                    label={t(
                      tFormBase + 'momentOfExecution.generationDay.title'
                    )}
                    required
                    data={applyLabelTranslations(WEEK_DAY_OPTIONS)}
                    onSelect={field.onChange}
                    selectedValue={WEEK_DAY_OPTIONS.find(
                      (val) => val.id === field.value
                    )}
                    error={fieldState.error ? fieldState.error.message : ''}
                    isReadOnly={isReadOnly}
                  />
                )}
              />
            ) : (
              <Controller
                name={'generationDay'}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <NumberField
                    label={t(
                      tFormBase + 'momentOfExecution.generationDay.title'
                    )}
                    required
                    value={field.value ?? 1}
                    min={
                      generationDayConfigByFrequency
                        ? generationDayConfigByFrequency.min
                        : 1
                    }
                    max={
                      generationDayConfigByFrequency
                        ? generationDayConfigByFrequency.max
                        : 1
                    }
                    placeholder={t(
                      generationDayConfigByFrequency
                        ? generationDayConfigByFrequency.placeholder
                        : ''
                    )}
                    allowDecimal={false}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error ? fieldState.error.message : ''}
                    disabled={isReadOnly}
                  />
                )}
              />
            )}
            <QuestionCircle
              content={t(tFormBase + 'momentOfExecution.generationDay.guide')}
              className="mt-6"
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default MomentOfExecution;
