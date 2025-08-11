import { DatesRangeValue } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '../../input/TextField';
import CustomDateTimePicker from '../CustomDateTimePicker';

type ReturnProps = {
  startDate: string | null;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
};

type DateRangeWithTimePickerFieldProps = {
  onChange: (val: ReturnProps) => void;
};

const DateRangeWithTimePickerField = ({
  onChange,
}: DateRangeWithTimePickerFieldProps) => {
  const { t } = useTranslation('components');

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<
    string | DatesRangeValue<string> | string[] | null
  >();
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('00:00:00');
  const [selectedRange, setSelectedRange] = useState('');

  useEffect(() => {
    setSelectedRange(
      dateRange
        ? (dateRange?.[0] ?? '--') +
            '\t' +
            startTime.slice(0, 5) +
            '\t -\t' +
            (dateRange?.[1] ?? '--') +
            '\t' +
            endTime.slice(0, 5)
        : ''
    );

    onChange({
      startDate: dateRange?.[0] || null,
      startTime: startTime.slice(0, 5),
      endDate: dateRange?.[1] || null,
      endTime: endTime.slice(0, 5),
    });
  }, [onChange, dateRange, startTime, endTime]);

  return (
    <div className="">
      <TextField
        onClick={() => setOpen(!open)}
        placeholder={t('comboBox.select')}
        value={selectedRange}
        styles={{
          input: {
            cursor: 'pointer',
          },
        }}
        onChange={() => {
          setSelectedRange('');
          onChange({
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
          });
        }}
      />
      {open && (
        <div className="fixed bg-white z-40">
          <CustomDateTimePicker
            withTimeRange={true}
            dateProps={{
              type: 'range',
              numberOfColumns: 2,
              onChange: setDateRange,
              size: 'xs',
            }}
            startTimeProps={{
              value: startTime,
              onChange: setStartTime,
            }}
            endTimeProps={{
              value: endTime,
              onChange: setEndTime,
              withSeconds: false,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeWithTimePickerField;
