import { Sort } from '@rhino/utils';
import { useMutation } from '@tanstack/react-query';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { AssetDashboardFilter, AssetDashboardTableRes } from '../types';

export const usePostAssetConsumptionTableData = () => {
  return useMutation({
    mutationFn: async ({
      body,
      meta: { page, size, sort },
    }: {
      body: AssetDashboardFilter;
      meta: { page: number | null; size: number | null; sort: Sort };
    }) => {
      const queryParams = {
        ...(!!page && { page }),
        ...(!!size && { size }),
        ...((sort.field || sort.direction) && {
          sort:
            sort.field && sort.direction
              ? `${sort.field},${sort.direction}`
              : sort.field || sort.direction,
        }),
      };

      const response = await httpClient.post(
        API_URLS.getAssetTotalConsumptionTableData(),
        body,
        {
          params: queryParams,
        }
      );

      return response.data as AssetDashboardTableRes;
    },
  });
};
