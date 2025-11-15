import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { MeasurementInfo } from '../types';

export const useGetMeasurementInfo = ({
  measurementUuid,
}: {
  measurementUuid: string;
}) => {
  return useQuery({
    queryKey: [DataQueryKeys.MEASUREMENT_INFO, measurementUuid],
    queryFn: async () => {
      const response = await httpClient.get<MeasurementInfo>(
        API_URLS.getMeasurementInfo({ measurementUuid })
      );
      return response.data;
    },
    enabled: !!measurementUuid,
    staleTime: Infinity,
  });
};
