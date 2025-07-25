import { Sort, TableMeta } from '@rhino/utils';

import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { PeriodicAlarmType } from '../types';

export type PeriodicAlarmTableData = {
  data: PeriodicAlarmType[];
  meta: TableMeta;
};

export type PeriodicAlarmRequestFilter = {
  page: number | null;
  size: number | null;
  sort: Sort;
  name: string | null;
  author: string | null;
  clientUuid: string | null;
  locationUuid: string | null;
  location: string | null;
  active: boolean | null;
  frequency: string | null;
  shared: boolean | null;
};

export const useGetPeriodicAlarmList = (params: PeriodicAlarmRequestFilter) => {
  const {
    page,
    size,
    sort,
    name,
    author,
    clientUuid,
    locationUuid,
    location,
    active,
    frequency,
    shared,
  } = params;

  const queryParams = {
    ...(!!page && { page }),
    ...(!!size && { size }),
    ...((sort.field || sort.direction) && {
      sort:
        sort.field && sort.direction
          ? `${sort.field},${sort.direction}`
          : sort.field || sort.direction,
    }),
    ...(!!name && { name }),
    ...(!!author && { author }),
    ...(!!clientUuid && { clientUuid }),
    ...(!!locationUuid && { locationUuid }),
    ...(!!location && { location }),
    ...(!!active && { active }),
    ...(!!frequency && { frequency }),
    ...(!!shared && { shared }),
  };

  return useQuery({
    queryKey: [DataQueryKeys.PERIODIC_ALARM, queryParams],
    queryFn: async () => {
      const response = await httpClient.get<PeriodicAlarmTableData>(
        API_URLS.getPeriodicAlarmList(),
        { params: queryParams }
      );
      return response.data;
    },
  });
};
