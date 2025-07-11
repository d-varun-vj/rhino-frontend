import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../httpClient';
import API_URLS from '../../endpoints';
import { PeriodicAlarmType } from '../types';
import { TableMeta } from '@rhino/utils';

export type PeriodicAlarmTableData = {
  data: PeriodicAlarmType[];
  meta: TableMeta;
};

export type PeriodicAlarmRequestBody = {
  page: number | null;
  size: number | null;
};

export const useGetAlarmList = (params: PeriodicAlarmRequestBody) => {
  return useQuery({
    queryKey: [params],
    queryFn: async () => {
      const response = await httpClient.get<PeriodicAlarmTableData>(
        API_URLS.getPeriodicAlarmList(),
        { params }
      );
      return response.data;
    },
  });
};
