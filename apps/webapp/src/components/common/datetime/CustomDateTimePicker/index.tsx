import {
  DatePicker,
  DatePickerBaseProps,
  DatePickerProps,
  DatePickerType,
  TimePicker,
  TimePickerProps,
} from '@mantine/dates';
import clsx from 'clsx';
import 'dayjs/locale/pl';
import { useTranslation } from 'react-i18next';
import CustomButton, { CustomButtonProps } from '../../buttons/CustomButton';
import styles from './custom-date-time-picker.module.css';

type TimeProps<T extends DatePickerType> = T extends 'range'
  ? {
      startTimeProps: TimePickerProps;
      endTimeProps: TimePickerProps;
      singleTimeProps?: never;
    }
  : {
      singleTimeProps: TimePickerProps;
      startTimeProps?: never;
      endTimeProps?: never;
    };

export type CustomDateTimePickerProps<
  S extends boolean,
  T extends DatePickerType,
> = {
  dateProps: DatePickerProps<T> & DatePickerBaseProps<T>;
  withTimeRange?: S;
  btnProps: CustomButtonProps & { onCancel: () => void };
  onSelectedRange: string;
} & (S extends true
  ? TimeProps<T>
  : {
      singleTimeProps?: never;
      startTimeProps?: never;
      endTimeProps?: never;
    });

const CustomDateTimePicker = <S extends boolean, T extends DatePickerType>({
  dateProps,
  withTimeRange,
  singleTimeProps,
  startTimeProps,
  endTimeProps,
  btnProps,
  onSelectedRange,
}: CustomDateTimePickerProps<S, T>) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('components');
  const isRangePicker = dateProps?.type === 'range';

  return (
    <div className="w-fit border-rhino-indigo-blue border-[1px] rounded p-1 pb-3 mt-1">
      <DatePicker locale={language} {...dateProps} />

      {withTimeRange && (
        <div
          className={clsx('grid ml-[20%] mt-5 gap-4', {
            'grid-cols-2': isRangePicker,
          })}
        >
          {isRangePicker ? (
            <>
              <TimePicker className={styles.timeField} {...startTimeProps} />
              <TimePicker className={styles.timeField} {...endTimeProps} />
            </>
          ) : (
            <TimePicker className={styles.timeField} {...singleTimeProps} />
          )}
        </div>
      )}
      <hr className="mt-5 text-rhino-grey/30" />
      <div className="w-full flex justify-end mt-5 gap-2 items-center">
        <span className="text-sm text-black">{onSelectedRange}</span>
        <CustomButton
          size="xs"
          variant="outline"
          type="default"
          text={t('datePicker.cancel')}
          onClick={btnProps.onCancel}
        />
        <CustomButton
          text={t('datePicker.apply')}
          size="xs"
          type="secondary"
          {...btnProps}
        />
      </div>
    </div>
  );
};

export default CustomDateTimePicker;
