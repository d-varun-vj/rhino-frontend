import { useGetMeteringPointTypes } from '@rhino/apis';
import CustomSelect from 'apps/webapp/src/components/common/comboboxes/CustomSelect';
import TextField from 'apps/webapp/src/components/common/input/TextField';
import Toggle from 'apps/webapp/src/components/common/input/Toggle';
import SharingSection from 'apps/webapp/src/components/shared/SharingSection';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RHFInputProps } from '../../../types';
import { SUPPORTED_TIMEZONES, tFormBase } from '../../config';
import { PeriodicAlarmSchema } from '../../validation';
import SectionWrapper from '../SectionWrapper';

const BasicInformation = ({
  register,
  control,
  setValue,
  watch,
  errors,
  setSelectedMediumType,
}: RHFInputProps & {
  setSelectedMediumType: (val: string | null) => void;
}) => {
  const { t, i18n } = useTranslation('periodicAlarm');
  const { client } = useUserFilter();
  const { data: meteringPointTypesRes } = useGetMeteringPointTypes({
    clientUuid: client ? client?.uuid : null,
    queryKey: [i18n.language],
  });

  return (
    <SectionWrapper title={t(tFormBase + 'basic.title')} id="basic-information">
      <div className="grid min-lg:grid-cols-2 grid-cols-1 min-lg:gap-0 gap-5">
        <TextField
          label={t(tFormBase + 'basic.alarmName')}
          required
          {...(register && { ...register('name') })}
          error={errors.name?.message}
        />
        <div className="flex min-lg:justify-end ">
          <Toggle
            label={t(tFormBase + 'basic.active')}
            {...(register && { ...register('isActive') })}
            activeColor="var(--color-rhino-indigo-blue-highlight)"
            defaultChecked
          />
        </div>
      </div>
      <SharingSection<PeriodicAlarmSchema>
        label={t(tFormBase + 'basic.shared')}
        control={control}
        error={!!errors.shared}
        setValue={setValue}
        watch={watch}
      />

      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        <Controller
          name="meteringPointTypeId"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <CustomSelect
              key={i18n.language}
              label={t(tFormBase + 'basic.mediumType')}
              required
              data={meteringPointTypesRes?.data.map((mediumTypeData) => ({
                label: mediumTypeData.name,
                value: mediumTypeData.id.toString(),
              }))}
              value={field.value?.toString() || null}
              onChange={(val) => {
                field.onChange(val ? +val : -1);
                setSelectedMediumType(
                  meteringPointTypesRes?.data.find(
                    (type) => type.id === (val ? +val : '')
                  )?.name ?? null
                );
              }}
              onBlur={field.onBlur}
              disabled={!client}
              title={t('Select client')}
              error={fieldState.error?.message}
              clearable
            />
          )}
        />
        <Controller
          name="userZone"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <CustomSelect
              label={t(tFormBase + 'basic.userZone')}
              required
              data={SUPPORTED_TIMEZONES}
              value={field.value || null}
              onChange={(val) => {
                field.onChange(val || '');
              }}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              clearable
              searchable={false}
            />
          )}
        />
      </div>
    </SectionWrapper>
  );
};

export default BasicInformation;
