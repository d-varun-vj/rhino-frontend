import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../../../../api/endpoints';
import { httpClient } from '../../../../../api/httpClient';
import { DataQueryKeys } from '../../../../../api/data-query-keys';

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
