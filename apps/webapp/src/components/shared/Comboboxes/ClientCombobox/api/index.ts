import API_URLS from '../../../../../api/endpoints';
import { httpClient } from '../../../../../api/httpClient';
import { VITE_WICKET_BASE_URL } from '../../../Sidebar/data';

export type Client = {
  name: string;
  uuid: string;
  useAggregateData: boolean;
};

export const getClients = ({
  userUuid,
}: {
  userUuid: string;
}): Promise<Client[]> => {
  return new Promise<Client[]>((resolve, reject) => {
    httpClient
      .get<Client[]>(API_URLS.getClients({ userUuid: userUuid }))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        window.location.href = VITE_WICKET_BASE_URL + 'login';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(error.response?.data || error);
      });
  });
};
