import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../data-query-keys';
import API_URLS from '../endpoints';
import { httpClient } from '../httpClient';

export type Client = {
  name: string;
  uuid: string;
  logo: string;
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
