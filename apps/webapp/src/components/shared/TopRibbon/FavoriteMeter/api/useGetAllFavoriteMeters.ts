import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../../../../api/endpoints';
import { httpClient } from '../../../../../api/httpClient';
import { FavoriteMeterFilter, FavoriteMeterType } from '../types';
import { DataQueryKeys } from '../../../../../api/data-query-keys';
import { UserType } from '../../../../../api/User/types';
import { Sort } from '../../../../../types/shared/table';

type TableData = {
  results: FavoriteMeterType[];
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
  userType,
}: {
  page?: number | null;
  size?: number | null;
  userUuid: string;
  clientUuid: string;
  filters?: FavoriteMeterFilter | null;
  sort?: Sort | null;
  userId: string | null;
  userType: UserType | null;
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
    userType: userType || '',
    shared: filters?.shared || '',
  });
  return useQuery({
    queryKey: [
      DataQueryKeys.FAVORITE_METERS,
      clientUuid,
      page,
      size,
      JSON.stringify(filters),
      sort?.direction,
      sort?.field,
    ],
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
