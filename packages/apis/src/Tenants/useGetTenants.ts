import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../data-query-keys';
import API_URLS from '../endpoints';
import { httpClient } from '../httpClient';

export type Tenant = {
  uuid: string;
  displayName: string;
  fullName: string;
  leaseNumber: string;
  clientName: string;
  localisationName: string;
  groupName: string;
  created: string;
  localizationName: string;
  localisationUuid: string;
  displayNameWithLeaseNumber: string;
  m2: number | null | string;
  leaseStartDate: string | null;
  leaseEndDate: string | null;
};

export const useGetTenants = ({
  clientUuid,
  queryKey,
}: {
  clientUuid: string | null;
  queryKey: unknown[];
}) => {
  return useQuery({
    queryKey: [DataQueryKeys.TENANTS, ...queryKey],
    queryFn: async () => {
      const response = await httpClient.get<{ data: Tenant[] }>(
        API_URLS.getTenants(),
        {
          params: {
            clientUuid,
          },
        }
      );
      return response.data;
    },
    enabled: clientUuid ? true : false,
  });
};
