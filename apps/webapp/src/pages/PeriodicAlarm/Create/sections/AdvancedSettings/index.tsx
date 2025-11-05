import { Languages } from '@rhino/apis';
import CustomAccordion from 'apps/webapp/src/components/common/Accordion';
import CustomSelect from 'apps/webapp/src/components/common/comboboxes/CustomSelect';
import FloatingSelector from 'apps/webapp/src/components/common/comboboxes/FloatingSelector';
import CustomTimePicker from 'apps/webapp/src/components/common/datetime/CustomTimePicker';
import QuestionCircle from 'apps/webapp/src/components/common/indicators/QuestionCircle';
import CheckBox from 'apps/webapp/src/components/common/input/Checkbox';
import NumberField from 'apps/webapp/src/components/common/input/NumberField';
import Heading from 'apps/webapp/src/components/typography/Heading';
import moment from 'moment-timezone';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, tFormBase } from '../../config';
import { PeriodicAlarmSchema } from '../../validation';

const AdvancedSettings = ({ isReadOnly = false }: { isReadOnly?: boolean }) => {
  const { control } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');

  const TIMEZONES = useMemo(() => {
    return moment.tz
      .names()
      .map((tz) => ({
        value: tz,
        label: `${tz} (${moment.tz(tz).format('Z')})`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  return (
    <CustomAccordion
      header={<Heading content={t(tFormBase + 'advancedSettings.title')} />}
      itemProps={{
        value: 'advanced-settings',
      }}
      chevronIconSize={30}
    >
      <div className="flex gap-5 flex-col">
        <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8 items-center">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <Controller
                name={'delayInDays'}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <NumberField
                    label={t(tFormBase + 'advancedSettings.gapAnalysis.title')}
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
            </div>
            <QuestionCircle
              content={t(tFormBase + 'advancedSettings.gapAnalysis.guide')}
              className="mt-6 w-fit"
            />
          </div>
          <Controller
            name="sendOnlyWhenExceeded"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CheckBox
                label={t(
                  tFormBase + 'advancedSettings.sendOnlyWhenExceeded.title'
                )}
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
        <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8 items-center">
          <Controller
            name="timezone"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <CustomSelect
                label={t(tFormBase + 'advancedSettings.timezone')}
                required
                data={TIMEZONES}
                value={field.value || null}
                onChange={(val) => {
                  field.onChange(val || '');
                }}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                clearable
                disabled={isReadOnly}
              />
            )}
          />
          <Controller
            name={'language'}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FloatingSelector
                label={t(tFormBase + 'advancedSettings.language')}
                required
                data={LANGUAGES}
                onSelect={field.onChange}
                selectedValue={LANGUAGES.find(
                  (val) => val.id === (field.value as Languages)
                )}
                error={fieldState.error ? fieldState.error.message : ''}
                isReadOnly={isReadOnly}
              />
            )}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Controller
            name={'generationTime'}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <CustomTimePicker
                label={t(tFormBase + 'advancedSettings.generationTime.title')}
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
            content={t(tFormBase + 'advancedSettings.generationTime.guide')}
            className="mt-6"
          />
        </div>
      </div>
    </CustomAccordion>
  );
};

export default AdvancedSettings;
