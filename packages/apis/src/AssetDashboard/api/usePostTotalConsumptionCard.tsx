import { useMutation } from '@tanstack/react-query';
import API_URLS from '../../endpoints.ts';
import { httpClient } from '../../httpClient.ts';
import {
  AssetDashboardCardReq,
  AssetDashboardCardRes,
} from '../types/index.ts';

export const usePostTotalConsumptionCard = () => {
  return useMutation({
    mutationFn: async (requestBody: AssetDashboardCardReq) => {
      const response = await httpClient.post(
        API_URLS.getAssetDashboardTotalConsumptionCardData(),
        requestBody
      );
      return response.data as AssetDashboardCardRes[];
    },
  });
};
