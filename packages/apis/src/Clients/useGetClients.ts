import { useQuery } from '@tanstack/react-query';
import API_URLS from '../endpoints';
import { httpClient } from '../httpClient';
import { DataQueryKeys } from '../data-query-keys';

export type Client = {
  name: string;
  uuid: string;
  useAggregateData: boolean;
};

export const useGetClients = ({ userUuid }: { userUuid: string }) => {
  return useQuery({
    queryKey: [DataQueryKeys.CLIENTS],
    queryFn: async () => {
      const response = await httpClient.get<Client[]>(API_URLS.getClients());
      return response.data;
    },
    enabled: userUuid ? true : false,
  });
};
