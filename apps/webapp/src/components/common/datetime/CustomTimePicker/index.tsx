import { TimePicker, TimePickerProps } from '@mantine/dates';
import clsx from 'clsx';
import Label from '../../../typography/Label';
import styles from './customtimepicker.module.css';

interface CustomTimePickerProps extends TimePickerProps {
  label?: string;
}

const CustomTimePicker = ({
  label,
  required,
  error,
  ...props
}: CustomTimePickerProps) => {
  return (
    <div className="flex flex-col gap-3.5">
      {label && (
        <Label
          content={label}
          htmlFor={label.toLowerCase()}
          required={required}
          className={clsx({ 'text-red-500': error })}
        />
      )}
      <TimePicker
        withDropdown
        className={styles.timePicker}
        error={error}
        {...props}
      />
    </div>
  );
};

export default CustomTimePicker;
