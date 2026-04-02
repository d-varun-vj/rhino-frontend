import { DateReturndProps } from 'apps/webapp/src/components/common/datetime/DateRangeWithTimePickerField';
import { createContext } from 'react';

type SelectedDateRangeStore = {
  dateRange: DateReturndProps | null;
  setDateRange: (dateRange: DateReturndProps | null) => void;
};

export const SelectedDateRangeContext = createContext<SelectedDateRangeStore>({
  dateRange: null,
  setDateRange: () => {},
});
