// export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL as string;
// export const BASE_URL: string = 'https://app.stg.rhino.energy/api/';
export const BASE_URL: string = 'http://localhost:8090/api/';

const API_URLS = {
  //   Top Ribbon
  getClients: () => 'clients',
  getLocations: ({ clientId }: { clientId: string | null }) =>
    `locations/${clientId}`,
  getUser: () => 'user',
  changeLanguage: ({
    userId,
    queryParams,
  }: {
    userId: string;
    queryParams: string;
  }) => `user/${userId}?${queryParams}`,

  getAllFavoriteMeters: ({ queryParams }: { queryParams: string }) =>
    `favoritemeter?${queryParams}`,

  //   Dashboard
  getDashboardTableData: ({ queryParams }: { queryParams: string }) =>
    `dashboard?${queryParams}`,
  getDashboardTableDataOptions: () => 'dashboard/options',
};

export default API_URLS;
