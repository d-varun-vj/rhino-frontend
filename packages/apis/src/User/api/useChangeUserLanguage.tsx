import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';

export const useChangeUserLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ lang }: { lang: string }) => {
      const response = await httpClient.put(API_URLS.changeLanguage(), {
        language: lang?.toString() || null,
      });
      return response.data as void;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [DataQueryKeys.PERIODIC_ALARM_DETAILS],
      });
    },
  });
};
