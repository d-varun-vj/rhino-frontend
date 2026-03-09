import CustomSelect from 'apps/webapp/src/components/common/comboboxes/CustomSelect';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MeasurementSortOrder } from '../../../types';
import {
  SORT_BY_OPTIONS,
  SORT_DIRECTION_OPTIONS,
  tFormBase,
} from '../../config';
import { applyLabelTranslations } from '../../helper';
import { PeriodicAlarmSchema } from '../../validation';
import SectionWrapper from '../SectionWrapper';

const MeasurementSorting = ({
  isReadOnly = false,
}: {
  isReadOnly?: boolean;
}) => {
  const { t } = useTranslation('periodicAlarm');
  const { control, watch, resetField } = useFormContext<PeriodicAlarmSchema>();

  const selectedSortOrder = watch('sortOrder') as MeasurementSortOrder;
  const selectedSortDirection = watch('sortDirection') as MeasurementSortOrder;

  const isDisbleDirectionField =
    !selectedSortOrder ||
    isReadOnly ||
    selectedSortOrder === MeasurementSortOrder.CUSTOM;

  return (
    <SectionWrapper
      title={t(tFormBase + 'measurementSorting.title')}
      id="measurement-sorting"
    >
      <div className="grid min-lg:grid-cols-2 grid-cols-1 gap-8">
        <div className="flex items-center gap-4 h-fit">
          <div className="block w-full">
            <Controller
              name="sortOrder"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label={t(tFormBase + 'measurementSorting.sortOrder')}
                  data={applyLabelTranslations(SORT_BY_OPTIONS)}
                  onChange={(val) => {
                    field.onChange(val ?? '');
                    resetField('sortDirection');
                  }}
                  value={field.value || null}
                  onBlur={field.onBlur}
                  searchable={false}
                  error={fieldState.error?.message}
                  disabled={isReadOnly}
                  dataTestIdPrefix="sort-order"
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 h-fit">
          <div className="block w-full">
            <Controller
              name="sortDirection"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <CustomSelect
                  key={'direction'}
                  label={t(
                    tFormBase + 'measurementSorting.sortDirection.title'
                  )}
                  required
                  data={applyLabelTranslations(SORT_DIRECTION_OPTIONS)}
                  onChange={(val) => {
                    field.onChange(val ?? '');
                  }}
                  value={field.value || null}
                  onBlur={field.onBlur}
                  searchable={false}
                  error={fieldState.error?.message}
                  disabled={isDisbleDirectionField}
                  dataTestIdPrefix="sort-direction"
                  title={
                    !selectedSortDirection
                      ? t(
                          tFormBase +
                            'measurementSorting.sortDirection.emptySortDirection'
                        )
                      : ''
                  }
                />
              )}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MeasurementSorting;
