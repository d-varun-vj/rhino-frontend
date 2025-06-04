import { useQuery } from '@tanstack/react-query';
import API_URLS from '../endpoints';
import { httpClient } from '../httpClient';
import { FavoriteMeterFilter, FavoriteMeterType } from './types';
import { DataQueryKeys } from '../data-query-keys';
import { UserType } from '../User/types';
import { Sort } from '@rhino/utils';

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
  userUuid: string;
  clientUuid: string;
  filters?: FavoriteMeterFilter | null;
  sort: Sort;
  userId: string | null;
  userType: UserType | null;
};

export const useGetAllFavoriteMeters = ({
  page,
  size,
  userUuid,
  clientUuid,
  filters,
  sort,
  userId,
  userType,
}: UseGetAllFavoriteMetersProps) => {
  const queryParams = {
    page: page?.toString() || '',
    size: size?.toString() || '',
    sort: `${sort.field},${sort.direction}`,
    userUuid: userUuid?.toString() || '',
    clientUuid: clientUuid?.toString() || '',
    name: filters?.name || '',
    authorEmail: filters?.authorEmail || '',
    userType: userType || '',
    shared: filters?.shared || '',
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
