import { useContext } from 'react';
import { UserFilterContext } from './user-filter-context';

export const useUserFilter = () => {
  return useContext(UserFilterContext);
};
