import { Controller, useFormContext } from 'react-hook-form';
import {
  DataRange,
  PeriodicAlarmCompareWith,
  PeriodicAlarmThresholdType,
} from '../../../types';
import {
  COMPARISON_METHOD_OPTIONS,
  DATA_RANGE_OPTIONS,
  VALID_ANALYSE_COMPARE_COMBINATIONS,
  VALID_THRESHOLD_OPTIONS,
  tFormBase,
} from '../../config';
import {
  applyLabelTranslations,
  shouldShowStartAndEndThresholdValue,
  shouldShowThresholdValue,
} from '../../helper';

import CustomSelect from 'apps/webapp/src/components/common/comboboxes/CustomSelect';
import CheckBox from 'apps/webapp/src/components/common/input/Checkbox';
import NumberField from 'apps/webapp/src/components/common/input/NumberField';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getValidFrequenciesForCombination } from '../../../helper';
import { PeriodicAlarmSchema } from '../../validation';
import SectionWrapper from '../SectionWrapper';

interface AlarmCriteriaProps {
  isReadOnly?: boolean;
  resetThresholdValues: () => void;
}

const AlarmCriteria = ({
  resetThresholdValues,
  isReadOnly = false,
}: AlarmCriteriaProps) => {
  const { control, watch, resetField, clearErrors, setValue } =
    useFormContext<PeriodicAlarmSchema>();

  const { t } = useTranslation('periodicAlarm');

  const selectedDataRange = watch('dataRange') as DataRange;
  const selectedCompareWith = watch(
    'compareWithPeriod'
  ) as PeriodicAlarmCompareWith;
  const selectedThresholdType = watch(
    'thresholdType'
  ) as PeriodicAlarmThresholdType;

  const filteredAnalysisCompareWithOptions = useMemo(() => {
    if (selectedDataRange)
      return VALID_ANALYSE_COMPARE_COMBINATIONS[selectedDataRange].allowed;
    return [];
  }, [selectedDataRange]);

  const filteredThresholdOptions = useMemo(() => {
    if (selectedCompareWith === PeriodicAlarmCompareWith.FIXED_VALUE) {
      return VALID_THRESHOLD_OPTIONS[PeriodicAlarmCompareWith.FIXED_VALUE];
    }
    return VALID_THRESHOLD_OPTIONS.OTHERS;
  }, [selectedCompareWith]);

  const shouldUnitPercent =
    selectedCompareWith !== PeriodicAlarmCompareWith.FIXED_VALUE;

  const setFrequency = ({
    dataRange,
    compareWith,
  }: {
    dataRange: DataRange;
    compareWith: PeriodicAlarmCompareWith;
  }) => {
    const defaultFrequcy = getValidFrequenciesForCombination(
      dataRange,
      compareWith
    );

    setValue('frequency', defaultFrequcy.default);
  };

  return (
    <SectionWrapper
      title={t(tFormBase + 'alarmCriteria.title')}
      id="alarm-criteria"
    >
      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        <Controller
          name="comparisonMethod"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <CustomSelect
              label={t(tFormBase + 'alarmCriteria.comparisonMethod')}
              required
              data={applyLabelTranslations(COMPARISON_METHOD_OPTIONS)}
              onChange={(val) => field.onChange(val ?? '')}
              value={field.value || null}
              onBlur={field.onBlur}
              searchable={false}
              error={fieldState.error?.message}
              disabled
            />
          )}
        />
      </div>

      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        <div className="flex items-center gap-4 h-fit">
          <div className="block w-full">
            <Controller
              name="dataRange"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label={t(tFormBase + 'alarmCriteria.dataRange')}
                  required
                  data={applyLabelTranslations(DATA_RANGE_OPTIONS)}
                  onChange={(val) => {
                    field.onChange(val ?? '');
                    resetField('compareWithPeriod');
                    setFrequency({
                      dataRange: val as DataRange,
                      compareWith: selectedCompareWith,
                    });
                    resetThresholdValues();
                  }}
                  value={field.value || null}
                  onBlur={field.onBlur}
                  searchable={false}
                  error={fieldState.error?.message}
                  disabled={isReadOnly}
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 h-fit">
          <div className="block w-full">
            <Controller
              name="compareWithPeriod"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <CustomSelect
                  key={selectedDataRange}
                  label={t(tFormBase + 'alarmCriteria.compareWith.title')}
                  required
                  data={applyLabelTranslations(
                    filteredAnalysisCompareWithOptions
                  )}
                  onChange={(val) => {
                    field.onChange(val ?? '');
                    setFrequency({
                      dataRange: selectedDataRange,
                      compareWith: val as PeriodicAlarmCompareWith,
                    });
                    resetThresholdValues();
                  }}
                  value={field.value || null}
                  onBlur={field.onBlur}
                  searchable={false}
                  error={fieldState.error?.message}
                  disabled={!selectedDataRange || isReadOnly}
                  title={
                    !selectedDataRange
                      ? t(
                          tFormBase + 'alarmCriteria.compareWith.emptyDataRange'
                        )
                      : ''
                  }
                />
              )}
            />
          </div>
          {/* <QuestionCircle
            content={t(tFormBase + 'alarmCriteria.compareWith.guide')}
            className="mt-6"
          /> */}
        </div>
      </div>

      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        {selectedCompareWith && selectedDataRange && (
          <div className="flex  gap-4">
            <div className="block w-full">
              <Controller
                name="thresholdType"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <CustomSelect
                    key={`${selectedDataRange}-${selectedCompareWith}`}
                    label={t(tFormBase + 'alarmCriteria.threshold.title')}
                    required
                    data={applyLabelTranslations(filteredThresholdOptions)}
                    onChange={(val) => {
                      field.onChange(val ?? '');
                      resetField('thresholdValue');
                      resetField('thresholdStartValue');
                      resetField('thresholdEndValue');
                    }}
                    value={field.value || null}
                    onBlur={field.onBlur}
                    searchable={false}
                    error={fieldState.error?.message}
                    disabled={!selectedDataRange || isReadOnly}
                  />
                )}
              />
            </div>
            {/* <QuestionCircle
              content={t(tFormBase + 'alarmCriteria.threshold.guide')}
              className="mt-6"
            /> */}
          </div>
        )}

        {shouldShowThresholdValue(
          selectedCompareWith,
          selectedThresholdType
        ) && (
          <div className="flex gap-4">
            <div className="block w-full">
              <Controller
                name="thresholdValue"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <NumberField
                    key={`${selectedDataRange}-${selectedCompareWith}`}
                    label={t(tFormBase + 'alarmCriteria.thresholdValue.title', {
                      unit: `${shouldUnitPercent ? '(%)' : ' '}`,
                    })}
                    required
                    decimalScale={2}
                    maxLength={shouldUnitPercent ? 10 : 13}
                    onChange={field.onChange}
                    value={field.value}
                    onBlur={field.onBlur}
                    error={fieldState.error?.message}
                    trimLeadingZeroesOnBlur={true}
                    disabled={isReadOnly}
                  />
                )}
              />
            </div>
            {/* <QuestionCircle
              content={t(tFormBase + 'alarmCriteria.thresholdValue.guide')}
              className="mt-6"
            /> */}
          </div>
        )}
      </div>

      {shouldShowStartAndEndThresholdValue(selectedThresholdType) && (
        <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
          <div className="flex  gap-4">
            <div className="block w-full">
              <Controller
                name="thresholdStartValue"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <NumberField
                    key={`${selectedDataRange}-${selectedCompareWith}-${selectedThresholdType}`}
                    label={t(
                      tFormBase + 'alarmCriteria.thresholdStartValue.title',
                      {
                        unit: `${shouldUnitPercent ? '(%)' : ' '}`,
                      }
                    )}
                    required
                    onChange={(e) => {
                      field.onChange(e);
                      clearErrors('thresholdStartValue');
                      clearErrors('thresholdEndValue');
                    }}
                    decimalScale={2}
                    maxLength={shouldUnitPercent ? 10 : 13}
                    value={field.value}
                    onBlur={field.onBlur}
                    error={fieldState.error?.message}
                    disabled={isReadOnly}
                  />
                )}
              />
            </div>
            {/* <QuestionCircle
              content={t(tFormBase + 'alarmCriteria.thresholdStartValue.guide')}
              className="mt-6"
            /> */}
          </div>
          <div className="flex  gap-4 h-fit">
            <div className="block w-full">
              <Controller
                name="thresholdEndValue"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <NumberField
                    key={`${selectedDataRange}-${selectedCompareWith}-${selectedThresholdType}`}
                    label={t(
                      tFormBase + 'alarmCriteria.thresholdEndValue.title',
                      {
                        unit: `${shouldUnitPercent ? '(%)' : ' '}`,
                      }
                    )}
                    required
                    value={field.value}
                    decimalScale={2}
                    maxLength={shouldUnitPercent ? 10 : 13}
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      field.onChange(e);
                      clearErrors('thresholdStartValue');
                      clearErrors('thresholdEndValue');
                    }}
                    error={fieldState.error?.message}
                    disabled={isReadOnly}
                  />
                )}
              />
            </div>
            {/* <QuestionCircle
              content={t(tFormBase + 'alarmCriteria.thresholdEndValue.guide')}
              className="mt-6"
            /> */}
          </div>
        </div>
      )}

      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        <Controller
          name="sendOnlyWhenExceeded"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CheckBox
              label={t(tFormBase + 'alarmCriteria.sendOnlyWhenExceeded.title')}
              checked={field.value}
              onChange={(e) => {
                const isChecked = e.currentTarget.checked;
                field.onChange(isChecked);
              }}
              disabled={isReadOnly}
            />
          )}
        />
      </div>
    </SectionWrapper>
  );
};

export default AlarmCriteria;
