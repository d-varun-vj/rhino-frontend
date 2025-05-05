import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../../../../api/endpoints';
import { httpClient } from '../../../../../api/httpClient';
import { Sort } from '../../../../../appRouter/Dashboard/types';
import { FavFilter, FavType } from '../types';
import { DataQueryKeys } from '../../../../../api/data-query-keys';

type TableData = {
  results: FavType[];
  totalCount: number;
};

export const useGetAllFavoriteMeters = ({
  page,
  size,
  userUuid,
  clientUuid,
  filters,
  sort,
  userId,
  queryKeys,
}: {
  page?: number | null;
  size?: number | null;
  userUuid: string;
  clientUuid: string;
  filters?: FavFilter | null;
  sort?: Sort | null;
  userId: string | null;
  queryKeys: unknown[];
}) => {
  const queryParams = new URLSearchParams({
    page: page?.toString() || '',
    size: size?.toString() || '',
    userUuid: userUuid?.toString() || '',
    clientUuid: clientUuid?.toString() || '',
    name: filters?.name || '',
    authorEmail: filters?.authorEmail || '',
    sortedField: sort?.field || '',
    sortDirection: sort?.direction || '',
  });
  return useQuery({
    queryKey: [DataQueryKeys.FAVORITE_METERS, ...queryKeys],
    queryFn: async () => {
      const response = await httpClient.get<TableData>(
        API_URLS.getAllFavoriteMeters({
          queryParams: queryParams.toString(),
        })
      );
      return response.data;
    },
    enabled: userId ? true : false,
  });
};
