import {
  DATE_FORMAT,
  DateReturndProps,
} from 'apps/webapp/src/components/common/datetime/DateRangeWithTimePickerField';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isValidTime, normalizeTime } from '../../helper';
import { SelectedDateRangeContext } from './selected-date-range-context';

export const SelectedDateRangeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const parseDateRangeFromParams = useCallback((): DateReturndProps | null => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');

    if (!startDate || !endDate) return null;

    const isStartDateValid = dayjs(startDate, DATE_FORMAT, true).isValid();
    const isEndDateValid = dayjs(endDate, DATE_FORMAT, true).isValid();

    if (
      !isStartDateValid ||
      !isEndDateValid ||
      !isValidTime(startTime) ||
      !isValidTime(endTime)
    ) {
      return null;
    }

    return {
      startDate,
      endDate,
      startTime: normalizeTime(startTime),
      endTime: normalizeTime(endTime),
    };
  }, [searchParams]);

  const [dateRange, setDateRangeState] = useState<DateReturndProps | null>(() =>
    parseDateRangeFromParams()
  );

  const setDateRange = useCallback(
    (range: DateReturndProps | null) => {
      setDateRangeState(range);

      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          if (range?.startDate && range?.endDate) {
            next.set('startDate', range.startDate);
            next.set('endDate', range.endDate);
            next.set('startTime', normalizeTime(range.startTime));
            next.set('endTime', normalizeTime(range.endTime));
          } else {
            next.delete('startDate');
            next.delete('endDate');
            next.delete('startTime');
            next.delete('endTime');
          }

          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  useEffect(() => {
    const parsedRange = parseDateRangeFromParams();

    setDateRangeState((prev) => {
      if (
        prev?.startDate === parsedRange?.startDate &&
        prev?.endDate === parsedRange?.endDate &&
        prev?.startTime === parsedRange?.startTime &&
        prev?.endTime === parsedRange?.endTime
      ) {
        return prev;
      }

      return parsedRange;
    });
  }, [parseDateRangeFromParams]);

  return (
    <SelectedDateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </SelectedDateRangeContext.Provider>
  );
};
