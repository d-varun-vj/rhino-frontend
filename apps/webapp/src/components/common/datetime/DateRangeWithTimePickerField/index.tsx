import { ActionIcon, MantineSize } from '@mantine/core';
import { DatesRangeValue, DateValue } from '@mantine/dates';
import { IconX } from '@tabler/icons-react';
import { getDateRangePresets } from 'apps/webapp/src/helpers/date';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarMinus } from 'react-icons/fa';
import TextField from '../../input/TextField';
import CustomDateTimePicker from '../CustomDateTimePicker';

dayjs.extend(customParseFormat);

export type DateReturndProps = {
  startDate: string | null;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
};

type DateRangeWithTimePickerFieldProps = {
  onChange: (val: DateReturndProps | null) => void;
  size?: MantineSize;
  placeholder?: string;
  initialValue?: DateReturndProps | null;
  alignRight?: boolean;
  withClearButton?: boolean;
  disabled?: boolean;
  disabledTitle?: string;
  withIcon?: boolean;
  height?: string;
};

export const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';

const normalizeTime = (time?: string | null) => {
  if (!time) return '00:00:00';
  const [hours = '00', minutes = '00', seconds] = time.split(':');
  return `${hours}:${minutes}:${seconds ?? '00'}`;
};

const buildDisplayValue = (
  startDate?: string | null,
  startTime?: string | null,
  endDate?: string | null,
  endTime?: string | null
) => {
  if (!startDate || !endDate) return '';

  return `${startDate} ${(startTime || '00:00').slice(0, 5)} - ${endDate} ${(endTime || '00:00').slice(0, 5)}`;
};

const parseInputValue = (value: string) => {
  const match = value
    .trim()
    .match(
      /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}(?::\d{2})?)\s*-\s*(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}(?::\d{2})?)$/
    );

  if (!match) {
    return null;
  }

  const [, startDate, startTimeRaw, endDate, endTimeRaw] = match;
  const startTime = normalizeTime(startTimeRaw);
  const endTime = normalizeTime(endTimeRaw);

  const isValidRange =
    dayjs(startDate, DATE_FORMAT, true).isValid() &&
    dayjs(endDate, DATE_FORMAT, true).isValid() &&
    dayjs(startTime, TIME_FORMAT, true).isValid() &&
    dayjs(endTime, TIME_FORMAT, true).isValid();

  if (!isValidRange) {
    return null;
  }

  return { startDate, startTime, endDate, endTime };
};

const DateRangeWithTimePickerField = ({
  onChange,
  size,
  initialValue,
  placeholder,
  alignRight = false,
  withClearButton = true,
  disabled,
  disabledTitle,
  withIcon = false,
  height,
}: DateRangeWithTimePickerFieldProps) => {
  const { t } = useTranslation('components');

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<
    string | DatesRangeValue<string> | string[] | undefined
  >(
    initialValue?.startDate && initialValue?.endDate
      ? [initialValue.startDate, initialValue.endDate]
      : undefined
  );
  const [startTime, setStartTime] = useState(
    normalizeTime(initialValue?.startTime || '00:00')
  );
  const [endTime, setEndTime] = useState(
    normalizeTime(initialValue?.endTime || '00:00')
  );
  const [selectedRange, setSelectedRange] = useState(
    buildDisplayValue(
      initialValue?.startDate,
      normalizeTime(initialValue?.startTime || '00:00'),
      initialValue?.endDate,
      normalizeTime(initialValue?.endTime || '00:00')
    )
  );
  const [animateIn, setAnimateIn] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const getDateRangeString = () => {
    return buildDisplayValue(
      dateRange?.[0],
      startTime,
      dateRange?.[1],
      endTime
    );
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

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSelectedRange(value);

    if (!value) {
      setDateRange(undefined);
      onChange(null);
      return;
    }

    const parsed = parseInputValue(value);

    if (parsed) {
      const {
        startDate,
        startTime: parsedStartTime,
        endDate,
        endTime: parsedEndTime,
      } = parsed;

      setDateRange([startDate, endDate]);
      setStartTime(parsedStartTime);
      setEndTime(parsedEndTime);

      const normalizedDisplay = buildDisplayValue(
        startDate,
        parsedStartTime,
        endDate,
        parsedEndTime
      );
      setSelectedRange(normalizedDisplay);

      onChange({
        startDate,
        startTime: parsedStartTime.slice(0, 5),
        endDate,
        endTime: parsedEndTime.slice(0, 5),
      });
    }
  };

  useEffect(() => {
    if (initialValue?.startDate && initialValue?.endDate) {
      const normalizedStart = normalizeTime(initialValue.startTime);
      const normalizedEnd = normalizeTime(initialValue.endTime);

      setDateRange([initialValue.startDate, initialValue.endDate]);
      setStartTime(normalizedStart);
      setEndTime(normalizedEnd);
      setSelectedRange(
        buildDisplayValue(
          initialValue.startDate,
          normalizedStart,
          initialValue.endDate,
          normalizedEnd
        )
      );
    } else {
      setDateRange(undefined);
      setStartTime('00:00:00');
      setEndTime('00:00:00');
      setSelectedRange('');
    }
  }, [initialValue]);

  useEffect(() => {
    if (open) {
      setAnimateIn(false);
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      setAnimateIn(false);
    }
  }, [open]);

  return (
    <div
      className={`${alignRight ? 'relative' : ''} w-full`}
      ref={containerRef}
    >
      <TextField
        onClick={() => setOpen(!open)}
        placeholder={
          open
            ? DATE_FORMAT + ' ' + 'HH:mm'
            : placeholder || t('comboBox.select')
        }
        value={selectedRange}
        {...(!!withClearButton &&
          !disabled && {
            rightSection: selectedRange ? (
              <ActionIcon
                size="sm"
                variant="subtle"
                color="gray"
                onMouseDown={(event) => event.preventDefault()}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedRange('');
                  setDateRange(undefined);
                  setStartTime('00:00:00');
                  setEndTime('00:00:00');
                  onChange(null);
                }}
              >
                <IconX size={14} />
              </ActionIcon>
            ) : undefined,
          })}
        {...(!!withClearButton && {
          rightSectionWidth: 32,
        })}
        styles={{
          input: {
            cursor: 'pointer',
            borderColor: open ? 'var(--color-rhino-indigo-blue)' : '',
            height: height,
          },
        }}
        {...(!!withIcon && {
          leftSection: <FaCalendarMinus size={16} />,
        })}
        onChange={handleTextFieldChange}
        onBlur={handleBlur}
        disabled={disabled}
        {...(!!disabled && {
          title: disabledTitle,
        })}
      />
      {open && (
        <div
          className={`${alignRight ? 'absolute' : 'fixed'} bg-white z-40 pb-2`}
          style={
            alignRight
              ? {
                  top: '100%',
                  right: 0,
                  opacity: animateIn ? 1 : 0,
                  transform: `translate(-6px, ${
                    animateIn ? '6px' : '0px'
                  }) scale(${animateIn ? 1 : 0.98})`,
                  transition: 'opacity 150ms ease, transform 180ms ease',
                }
              : {
                  opacity: animateIn ? 1 : 0,
                  transform: `translate(0px, ${animateIn ? '6px' : '0px'}) scale(${
                    animateIn ? 1 : 0.98
                  })`,
                  transition: 'opacity 150ms ease, transform 180ms ease',
                }
          }
        >
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
