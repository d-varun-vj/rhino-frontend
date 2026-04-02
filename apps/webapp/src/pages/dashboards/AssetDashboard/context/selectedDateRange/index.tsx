import { useContext } from 'react';
import { SelectedDateRangeContext } from './selected-date-range-context';

export const useSelectedDateRange = () => {
  return useContext(SelectedDateRangeContext);
};
