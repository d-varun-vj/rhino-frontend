import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useGetMeteringPointTypes } from '@rhino/apis';
import CustomSelect from 'apps/webapp/src/components/common/comboboxes/CustomSelect';
import TextField from 'apps/webapp/src/components/common/input/TextField';
import Toggle from 'apps/webapp/src/components/common/input/Toggle';
import SharingSection from 'apps/webapp/src/components/shared/SharingSection';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import { tFormBase } from '../../config';
import { PeriodicAlarmSchema } from '../../validation';
import SectionWrapper from '../SectionWrapper';

interface BasicInformationProps {
  setSelectedMediumType: ({
    name,
    unit,
  }: {
    name: string | null;
    unit: string | null;
  }) => void;
  isReadOnly?: boolean;
  hasCreatorAccess?: boolean;
  isUpdate?: boolean;
}

const BasicInformation = ({
  setSelectedMediumType,
  isReadOnly = false,
  hasCreatorAccess = true,
  isUpdate = false,
}: BasicInformationProps) => {
  const {
    control,
    register,
    resetField,
    formState: { errors },
  } = useFormContext<PeriodicAlarmSchema>();
  const { t, i18n } = useTranslation('periodicAlarm');
  const { client } = useUserFilter();
  const { data: meteringPointTypesRes } = useGetMeteringPointTypes({
    clientUuid: client ? client?.uuid : null,
    queryKey: [i18n.language],
  });

  const TIMEZONES = useMemo(() => {
    return moment.tz
      .names()
      .map((tz) => ({
        value: tz,
        label: `${tz} (${moment.tz(tz).format('Z')})`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  useEffect(() => {
    resetField('meteringPointTypeId');
  }, [client, resetField]);

  return (
    <SectionWrapper title={t(tFormBase + 'basic.title')} id="basic-information">
      <div className="grid min-lg:grid-cols-2 grid-cols-1 min-lg:gap-0 gap-5">
        <TextField
          label={t(tFormBase + 'basic.alarmName')}
          required
          {...(register && { ...register('name') })}
          error={errors.name?.message}
          disabled={isReadOnly}
        />
        <div className="flex min-lg:justify-end ">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Toggle
                label={t(tFormBase + 'basic.active')}
                checked={field.value}
                onChange={(e) => field.onChange(e.currentTarget.checked)}
                onBlur={field.onBlur}
                activeColor="var(--color-rhino-indigo-blue-highlight)"
                disabled={isReadOnly}
              />
            )}
          />
        </div>
      </div>
      {hasCreatorAccess && (
        <SharingSection
          label={t(tFormBase + 'basic.shared')}
          isReadOnly={isReadOnly}
          mode={isUpdate ? 'update' : 'create'}
        />
      )}

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
                const selectedVal = meteringPointTypesRes?.data.find(
                  (type) => type.id === (val ? +val : '')
                );
                setSelectedMediumType({
                  name: selectedVal?.name ?? null,
                  unit: selectedVal?.unit ?? null,
                });
              }}
              onBlur={field.onBlur}
              disabled={!client || isReadOnly}
              title={t('Select client')}
              error={fieldState.error?.message}
              clearable
            />
          )}
        />
        <Controller
          name="timezone"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <CustomSelect
              label={t(tFormBase + 'basic.timezone')}
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
      </div>
    </SectionWrapper>
  );
};

export default BasicInformation;
