import API_URLS from '../endpoints';
import { DATA_QUERY_KEYS } from '../data-query-keys';
import { User } from './types';
import { httpClient } from '../httpClient';
import { useQuery } from '@tanstack/react-query';

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: [...DATA_QUERY_KEYS.user],
    queryFn: async () => {
      const response = await httpClient.get<User>(API_URLS.getUser());
      return response.data;
    },
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
    httpClient
      .put(
        API_URLS.changeLanguage({
          userId,
        }),
        {
          language: lang?.toString() || null,
        }
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
