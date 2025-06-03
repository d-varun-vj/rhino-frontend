import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { DictionaryDto } from '../types';
import { DataQueryKeys } from '../../data-query-keys';

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
