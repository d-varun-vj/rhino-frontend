import { TimePicker, TimePickerProps } from '@mantine/dates';
import ErrorText from '../../../typography/ErrorText';
import Label from '../../../typography/Label';
import styles from './customtimepicker.module.css';

interface CustomTimePickerProps extends TimePickerProps {
  label?: string;
  error?: string;
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
        />
      )}
      <TimePicker
        withDropdown
        className={styles.timePicker}
        error={!!error}
        {...props}
      />
      {error && <ErrorText content={error} />}
    </div>
  );
};

export default CustomTimePicker;
