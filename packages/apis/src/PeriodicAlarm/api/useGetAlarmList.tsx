import { Sort, TableMeta } from '@rhino/utils';

import API_URLS from '../../endpoints';
import { DataQueryKeys } from '../../data-query-keys';
import { PeriodicAlarmType } from '../types';
import { httpClient } from '../../httpClient';
import { useQuery } from '@tanstack/react-query';

export type PeriodicAlarmTableData = {
  data: PeriodicAlarmType[];
  meta: TableMeta;
};

export type PeriodicAlarmRequestBody = {
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

export const useGetPeriodicAlarmList = (params: PeriodicAlarmRequestBody) => {
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
