import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { PeriodicAlarmDetail } from '../types';

export const useGetAlarmDetails = (uuid: string) => {
  return useQuery({
    queryKey: [DataQueryKeys.PERIODIC_ALARM_DETAILS, uuid],
    queryFn: async () => {
      const response = await httpClient.get<PeriodicAlarmDetail>(
        API_URLS.getAlarmDetails(uuid)
      );
      return response;
    },
  });
};
