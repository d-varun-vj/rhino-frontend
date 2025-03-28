import API_URLS, { BASE_URL } from '../../../../../api/endpoints';
import { initHttpClient } from '../../../../../api/httpClient';
import { VITE_WICKET_BASE_URL } from '../../../Sidebar/data';

export type Client = {
  name: string;
  uuid: string;
  useAggregateData: boolean;
};

export const getClients = (): Promise<Client[]> => {
  return new Promise<Client[]>((resolve, reject) => {
    initHttpClient(BASE_URL)
      .httpClient.get<Client[]>(API_URLS.getClients())
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
