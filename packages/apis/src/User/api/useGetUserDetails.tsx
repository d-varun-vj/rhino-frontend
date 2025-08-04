import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { User } from '../types';

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: [DataQueryKeys.USER],
    queryFn: async () => {
      const response = await httpClient.get<User>(API_URLS.getUser());
      return response.data;
    },
  });
};
