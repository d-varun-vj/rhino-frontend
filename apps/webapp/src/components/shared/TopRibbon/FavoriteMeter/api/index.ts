import API_URLS from '../../../../../api/endpoints';
import { httpClient } from '../../../../../api/httpClient';
import { Sort } from '../../../../../appRouter/Dashboard/types';
import { FavFilter, FavType } from '../types';

type TableData = {
  results: FavType[];
  totalCount: number;
};

export const getAllFavoriteMeters = ({
  page,
  size,
  userUuid,
  clientUuid,
  filters,
  sort,
}: {
  page?: number | null;
  size?: number | null;
  userUuid: string;
  clientUuid: string;
  filters?: FavFilter | null;
  sort?: Sort | null;
}) => {
  return new Promise<TableData>((resolve, reject) => {
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
    httpClient
      .get(
        API_URLS.getAllFavoriteMeters({
          queryParams: queryParams.toString(),
        })
      )
      .then((res) => {
        resolve(res.data as TableData);
      })
      .catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(err.response?.data);
      });
  });
};
