import API_URLS from '../endpoints';
import { httpClient } from '../httpClient';
import { User } from './types';

export const getUser = (): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    httpClient
      .get<User>(API_URLS.getUser())
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(error.response?.data);
      });
  });
};

export const changeUserLanguage = ({
  userId,
  lang,
}: {
  userId: string;
  lang: string;
}) => {
  return new Promise((resolve, reject) => {
    const queryParams = new URLSearchParams({
      language: lang?.toString() || '',
    });
    httpClient
      .put(
        API_URLS.changeLanguage({
          userId,
          queryParams: queryParams.toString(),
        })
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
