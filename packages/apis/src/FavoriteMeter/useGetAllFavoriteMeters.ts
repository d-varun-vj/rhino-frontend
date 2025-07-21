import { Sort } from '@rhino/utils';
import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../data-query-keys';
import API_URLS from '../endpoints';
import { httpClient } from '../httpClient';
import { FavoriteMeterFilter, FavoriteMeterType } from './types';

type TableData = {
  content: FavoriteMeterType[];
  totalElements: number;
  size: number;
  totalPages: number;
  empty: boolean;
};

type UseGetAllFavoriteMetersProps = {
  page?: number | null;
  size?: number | null;
  clientUuid: string | null;
  filters?: FavoriteMeterFilter | null;
  sort: Sort;
  userId: string | null;
};

export const useGetAllFavoriteMeters = ({
  page,
  size,
  clientUuid,
  filters,
  sort,
  userId,
}: UseGetAllFavoriteMetersProps) => {
  const queryParams = {
    ...(!!page && { page: page?.toString() }),
    ...(!!size && { size: size?.toString() }),
    ...((sort.field || sort.direction) && {
      sort:
        sort.field && sort.direction
          ? `${sort.field},${sort.direction}`
          : sort.field || sort.direction,
    }),
    ...(clientUuid != 'null' && { clientUuid: clientUuid?.toString() }),
    ...(!!filters?.name && { name: filters?.name }),
    ...(!!filters?.authorEmail && { authorEmail: filters?.authorEmail }),
    ...(!!filters?.shared && { shared: filters?.shared }),
  };

  return useQuery({
    queryKey: [
      DataQueryKeys.FAVORITE_METERS,
      clientUuid,
      page,
      size,
      JSON.stringify(filters),
      sort.direction,
      sort.field,
    ],
    queryFn: async () => {
      const response = await httpClient.get<TableData>(
        API_URLS.getAllFavoriteMeters(),
        { params: queryParams }
      );
      return response.data;
    },
    enabled: userId ? true : false,
  });
};
