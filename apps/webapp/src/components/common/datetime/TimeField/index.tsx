import { TimePicker, TimePickerProps } from '@mantine/dates';
import styles from './timefiled.module.css';

const TimeField = ({ ...props }: TimePickerProps) => {
  return <TimePicker className={styles.timeField} withDropdown {...props} />;
};

export default TimeField;
