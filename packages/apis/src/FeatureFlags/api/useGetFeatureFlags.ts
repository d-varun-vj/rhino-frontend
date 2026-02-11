import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { Feature } from '../types';

export type FeatureFlag = Record<string, boolean>;

export const useGetFeatureFlags = ({ features }: { features: string[] }) => {
  return useQuery({
    queryKey: [DataQueryKeys.FEATURE_FLAGS],
    queryFn: async () => {
      const response = await httpClient.get<Feature>(
        API_URLS.getFeatureFlag(),
        { params: { features } }
      );
      return response.data;
    },
  });
};
