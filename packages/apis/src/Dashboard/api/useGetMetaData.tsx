import { useQuery } from '@tanstack/react-query';
import { Options } from '../../Common';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';

export const useGetMetaData = ({ locale }: { locale: string | null }) => {
  return useQuery({
    queryKey: [DataQueryKeys.OPTIONS, locale],
    queryFn: async () => {
      const response = await httpClient.get<Options>(
        API_URLS.getDashboardTableDataOptions(),
        { params: { locale: locale || 'en' } }
      );
      return response.data;
    },
  });
};
