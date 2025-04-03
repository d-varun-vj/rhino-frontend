import API_URLS, { BASE_URL } from '../../../../../api/endpoints';
import { initHttpClient } from '../../../../../api/httpClient';
import { FavType } from '../types';

type TableData = {
  results: FavType[];
  totalCount: number;
};

export const getAllFavoriteMeters = ({
  page,
  size,
  userUuid,
  clientUuid,
  name,
  authorEmail,
  sortedField,
  sortDirection,
}: {
  page?: number | null;
  size?: number | null;
  userUuid: string;
  clientUuid: string;
  name?: string | null;
  authorEmail?: string | null;
  sortedField?: string | null;
  sortDirection?: string | null;
}) => {
  return new Promise<TableData>((resolve, reject) => {
    const queryParams = new URLSearchParams({
      page: page?.toString() || '',
      size: size?.toString() || '',
      userUuid: userUuid?.toString() || '',
      clientUuid: clientUuid?.toString() || '',
      name: name || '',
      authorEmail: authorEmail || '',
      sortedField: sortedField || '',
      sortDirection: sortDirection || '',
    });
    initHttpClient(BASE_URL)
      .httpClient.get(
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
