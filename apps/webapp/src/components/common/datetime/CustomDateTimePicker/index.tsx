import {
  DatePicker,
  DatePickerProps,
  DatePickerType,
  TimePicker,
  TimePickerProps,
} from '@mantine/dates';
import clsx from 'clsx';
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
  dateProps: DatePickerProps<T>;
  withTimeRange?: S;
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
}: CustomDateTimePickerProps<S, T>) => {
  const isRangePicker = dateProps?.type === 'range';

  return (
    <div className="w-fit border-rhino-indigo-blue border-[1px] rounded p-1 pb-3 mt-1">
      <DatePicker {...dateProps} />

      {withTimeRange && (
        <div
          className={clsx('grid  mt-2 gap-4', {
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
    </div>
  );
};

export default CustomDateTimePicker;
