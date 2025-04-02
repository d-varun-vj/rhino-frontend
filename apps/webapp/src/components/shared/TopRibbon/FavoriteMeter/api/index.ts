import API_URLS, { BASE_URL } from '../../../../../api/endpoints';
import { initHttpClient } from '../../../../../api/httpClient';
import { FavType } from '../types';

export const getAllFavoriteMeters = ({
  userUuid,
  clientUuid,
}: {
  userUuid: string;
  clientUuid: string;
}) => {
  return new Promise<FavType[]>((resolve, reject) => {
    const queryParams = new URLSearchParams({
      userUuid: userUuid?.toString() || '',
      clientUuid: clientUuid?.toString() || '',
    });
    initHttpClient(BASE_URL)
      .httpClient.get(
        API_URLS.getAllFavoriteMeters({
          queryParams: queryParams.toString(),
        })
      )
      .then((res) => {
        resolve(res.data as FavType[]);
      })
      .catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(err.response?.data);
      });
  });
};
