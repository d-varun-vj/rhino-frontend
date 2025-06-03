import { useQuery } from '@tanstack/react-query';
import API_URLS from '../endpoints';
import { httpClient } from '../httpClient';
import { DataQueryKeys } from '../data-query-keys';

export type Location = {
  uuid: string;
  name: string;
  groups: {
    uuid: string;
    name: string;
  }[];
};

export const useGetLocations = ({
  clientId,
  queryKey,
}: {
  clientId: string | null;
  queryKey: unknown[];
}) => {
  return useQuery({
    queryKey: [DataQueryKeys.LOCATIONS, ...queryKey],
    queryFn: async () => {
      const response = await httpClient.get<Location[]>(
        API_URLS.getLocations({ clientId: clientId })
      );
      return response.data;
    },
    enabled: clientId ? true : false,
  });
};
