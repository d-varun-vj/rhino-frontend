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

export const changeUserLanguage = ({ lang }: { lang: string }) => {
  return new Promise((resolve, reject) => {
    const queryParams = new URLSearchParams({
      language: lang?.toString() || '',
    });
    initHttpClient(BASE_URL)
      .httpClient.get(
        API_URLS.changeLanguage({ queryParams: queryParams.toString() })
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(err.response?.data);
        console.log(err);
      });
  });
};
