import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../../../../api/endpoints';
import { httpClient } from '../../../../../api/httpClient';
import { VITE_WICKET_BASE_URL } from '../../../Sidebar/config';
import { DataQueryKeys } from '../../../../../api/data-query-keys';

export type Location = {
  uuid: string;
  name: string;
  groups: {
    uuid: string;
    name: string;
  }[];
};

export const getLocations = ({
  clientId,
}: {
  clientId: string | null;
}): Promise<Location[]> => {
  if (clientId === null) {
    return Promise.resolve([]);
  }
  return new Promise<Location[]>((resolve, reject) => {
    httpClient
      .get<Location[]>(API_URLS.getLocations({ clientId: clientId }))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        window.location.href = VITE_WICKET_BASE_URL + 'login';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(error.response?.data);
      });
  });
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
