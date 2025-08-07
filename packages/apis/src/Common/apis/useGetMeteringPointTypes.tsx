import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';

type MeteringPointTypes = {
  id: number;
  mappId: number;
  name: string;
  unit: string;
  subunit: string;
};

type MeteringPointTypesRes = {
  data: MeteringPointTypes[];
};

export const useGetMeteringPointTypes = ({
  clientUuid,
  queryKey,
}: {
  clientUuid: string | null;
  queryKey: unknown[];
}) => {
  return useQuery({
    queryKey: [DataQueryKeys.METERING_POINT_TYPES, clientUuid, ...queryKey],
    queryFn: async () => {
      const response = await httpClient.get<MeteringPointTypesRes>(
        API_URLS.getMeteringPointTypes(),
        { params: { ...(clientUuid && { clientUuid }) } }
      );
      return response.data;
    },
    enabled: !!clientUuid,
  });
};
