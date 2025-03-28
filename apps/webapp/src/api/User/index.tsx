import API_URLS, { BASE_URL } from '../endpoints';
import { initHttpClient } from '../httpClient';
import { User } from './types';

export const getUser = (): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    initHttpClient(BASE_URL)
      .httpClient.get<User>(API_URLS.getUser())
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(error.response?.data);
      });
  });
};
