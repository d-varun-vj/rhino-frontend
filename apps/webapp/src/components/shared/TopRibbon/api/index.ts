import API_URLS, { BASE_URL } from '../../../../api/endpoints';
import { initHttpClient } from '../../../../api/httpClient';
import { Client, Location } from '../types';

export const getLocations = ({
  clientId,
}: {
  clientId: string | null;
}): Promise<Location[]> => {
  if (clientId === null) {
    return Promise.resolve([]);
  }
  return new Promise<Location[]>((resolve) => {
    initHttpClient(BASE_URL)
      .httpClient.get<Location[]>(API_URLS.getLocations({ clientId: clientId }))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        // reject(error.response?.data || error);
      });
  });
};

export const getClients = (): Promise<Client[]> => {
  return new Promise<Client[]>((resolve) => {
    initHttpClient(BASE_URL)
      .httpClient.get<Client[]>(API_URLS.getClients())
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        // reject(error.response?.data || error);
      });
  });
};
