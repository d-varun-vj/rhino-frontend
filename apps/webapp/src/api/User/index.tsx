import API_URLS from '../endpoints';
import { DataQueryKeys } from '../data-query-keys';
import { User } from './types';
import { httpClient } from '../httpClient';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: [DataQueryKeys.USER],
    queryFn: async () => {
      const response = await httpClient.get<User>(API_URLS.getUser());
      return response.data;
    },
  });
};

export const useChangeUserLanguage = () => {
  return useMutation({
    mutationFn: async ({ userId, lang }: { userId: string; lang: string }) => {
      const response = await httpClient.put(
        API_URLS.changeLanguage({ userId }),
        { language: lang?.toString() || null }
      );
      return response.data as void;
    },
  });
};
