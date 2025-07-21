import { useMutation, useQueryClient } from '@tanstack/react-query';

import API_URLS from '../../endpoints';
import { DataQueryKeys } from '../../data-query-keys';
import { httpClient } from '../../httpClient';

export const useDeletePeriodicAlarm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uuid: string) => {
      await httpClient.delete(API_URLS.deletePeriodicAlarm(uuid));
    },
    onSuccess: async () => {
      // Invalidate and refetch the periodic alarm list after successful deletion
      await queryClient.invalidateQueries({
        queryKey: [DataQueryKeys.PERIODIC_ALARM],
      });
    },
  });
};
