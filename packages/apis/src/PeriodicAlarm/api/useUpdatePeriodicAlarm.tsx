import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { PeriodicAlarmUpdateReq } from '../types';

export const useUpdatePeriodicAlarm = (uuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestBody: PeriodicAlarmUpdateReq) => {
      const response = await httpClient.put(
        API_URLS.updateAlarm(uuid),
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
