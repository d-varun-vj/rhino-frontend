import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { PeriodicAlarmReq } from '../types';

export const usePostPeriodicAlarm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestBody: PeriodicAlarmReq) => {
      const response = await httpClient.post(
        API_URLS.createPeriodicAlarm(),
        requestBody
      );
      return response.data as void;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [DataQueryKeys.PERIODIC_ALARM_LIST],
      });
    },
  });
};
