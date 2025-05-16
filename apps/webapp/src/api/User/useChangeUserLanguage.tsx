import API_URLS from '../endpoints';
import { httpClient } from '../httpClient';
import { useMutation } from '@tanstack/react-query';

export const useChangeUserLanguage = () => {
  return useMutation({
    mutationFn: async ({ lang }: { lang: string }) => {
      const response = await httpClient.put(API_URLS.changeLanguage(), {
        language: lang?.toString() || null,
      });
      return response.data as void;
    },
  });
};
