// export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL as string;
export const BASE_URL: string = 'https://app.stg.rhino.energy/api/';
// export const BASE_URL: string = 'http://localhost:8090/api/';

const API_URLS = {
  //   Top Ribbon
  getLocations: ({ clientId }: { clientId: string | null }) =>
    `locations/${clientId}`,
  getClients: () => 'clients',

  //   Dashboard
  getDashboardTableData: ({ queryParams }: { queryParams: string }) =>
    `dashboard?${queryParams}`,

  getUser: () => 'user',
  changeLanguage: ({ queryParams }: { queryParams: string }) =>
    `user/language?${queryParams}`,
};

export default API_URLS;
