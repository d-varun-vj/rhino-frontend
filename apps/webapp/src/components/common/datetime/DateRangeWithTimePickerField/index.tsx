import { MantineSize } from '@mantine/core';
import { DatesRangeValue, DateValue } from '@mantine/dates';
import { getDateRangePresets } from 'apps/webapp/src/helpers/date';
import { useRef, useState } from 'react';
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
  size?: MantineSize;
};

const DateRangeWithTimePickerField = ({
  onChange,
  size,
}: DateRangeWithTimePickerFieldProps) => {
  const { t } = useTranslation('components');

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<
    string | DatesRangeValue<string> | string[] | undefined
  >();
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('00:00:00');
  const [selectedRange, setSelectedRange] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  const getDateRangeString = () => {
    return dateRange
      ? (dateRange?.[0] ?? ' ') +
          '\t' +
          (startTime.slice(0, 5) || '00:00') +
          '\t -\t' +
          (dateRange?.[1] ?? ' ') +
          '\t' +
          (endTime.slice(0, 5) || '00:00')
      : '';
  };

  const disableApplyBtn = !dateRange?.[0] || !dateRange?.[1];

  const handleBlur = () => {
    setTimeout(() => {
      const focusedElement = document.activeElement;
      const isWithinComponent = containerRef.current?.contains(focusedElement);

      if (!isWithinComponent && open) {
        setOpen(false);
      }
    }, 0);
  };

  return (
    <div className="w-full" ref={containerRef}>
      <TextField
        onClick={() => setOpen(!open)}
        placeholder={t('comboBox.select')}
        value={selectedRange}
        styles={{
          input: {
            cursor: 'pointer',
            borderColor: open ? 'var(--color-rhino-indigo-blue)' : '',
          },
        }}
        onChange={() => {
          setSelectedRange('');
          setDateRange(undefined);
          onChange({
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
          });
        }}
        onBlur={handleBlur}
      />
      {open && (
        <div className="fixed bg-white z-40 pb-2">
          <CustomDateTimePicker
            withTimeRange={true}
            dateProps={{
              type: 'range',
              numberOfColumns: 2,
              onChange: setDateRange,
              size: size,
              value: dateRange as DatesRangeValue<DateValue> | undefined,
              presets: getDateRangePresets({ t }),
            }}
            startTimeProps={{
              value: startTime,
              onChange: setStartTime,
              withDropdown: true,
            }}
            endTimeProps={{
              value: endTime,
              onChange: setEndTime,
              withSeconds: false,
              withDropdown: true,
            }}
            btnProps={{
              onClick: () => {
                onChange({
                  startDate: dateRange?.[0] || null,
                  startTime: startTime.slice(0, 5) || '00:00',
                  endDate: dateRange?.[1] || null,
                  endTime: endTime.slice(0, 5) || '00:00',
                });
                setSelectedRange(getDateRangeString());
                setOpen(false);
              },
              onCancel: () => {
                setOpen(false);
              },
              disabled: disableApplyBtn,
            }}
            onSelectedRange={getDateRangeString()}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeWithTimePickerField;
