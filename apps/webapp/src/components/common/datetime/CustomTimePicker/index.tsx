import { TimePicker, TimePickerProps } from '@mantine/dates';
import ErrorText from '../../../typography/ErrorText';
import Label from '../../../typography/Label';
import styles from './customtimepicker.module.css';

interface CustomTimePickerProps extends TimePickerProps {
  label?: string;
  error?: string;
  dataTestIdPrefix?: string;
}

const CustomTimePicker = ({
  label,
  required,
  error,
  dataTestIdPrefix,
  ...props
}: CustomTimePickerProps) => {
  return (
    <div className="flex flex-col gap-3.5">
      {label && (
        <Label
          content={label}
          htmlFor={label.toLowerCase()}
          required={required}
          data-testid={`${dataTestIdPrefix}-label`}
        />
      )}
      <TimePicker
        withDropdown
        className={styles.timePicker}
        error={!!error}
        data-testid={`${dataTestIdPrefix}-val`}
        {...props}
      />
      {error && <ErrorText content={error} />}
    </div>
  );
};

export default CustomTimePicker;
