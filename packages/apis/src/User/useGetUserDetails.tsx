import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import { User } from './types';
import API_URLS from '../endpoints';
import { DataQueryKeys } from '../data-query-keys';

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: [DataQueryKeys.USER],
    queryFn: async () => {
      const response = await httpClient.get<User>(API_URLS.getUser());
      return response.data;
    },
  });
};
