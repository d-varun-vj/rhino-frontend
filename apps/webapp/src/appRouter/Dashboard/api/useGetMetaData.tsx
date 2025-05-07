import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../../api/endpoints';
import { httpClient } from '../../../api/httpClient';
import { DictionaryDto } from '../types';
import { DataQueryKeys } from '../../../api/data-query-keys';

type Options = {
  levelTypes: DictionaryDto[];
  loadTypes: DictionaryDto[];
  endUserAreaTypes: DictionaryDto[];
};

export const useGetMetaData = ({ locale }: { locale: string | null }) => {
  return useQuery({
    queryKey: [DataQueryKeys.OPTIONS],
    queryFn: async () => {
      const response = await httpClient.get<Options>(
        API_URLS.getDashboardTableDataOptions({
          locale: locale ? locale : 'en',
        })
      );
      return response.data;
    },
  });
};
