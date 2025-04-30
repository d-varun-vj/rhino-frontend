// export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL as string;
// export const BASE_URL: string = 'https://app.stg.rhino.energy/api/app/';
export const BASE_URL: string = 'http://localhost:8090/api/app/';

const API_URLS = {
  //   Top Ribbon
  getClients: ({ userUuid }: { userUuid: string }) =>
    `clients/user/${userUuid}`,
  getLocations: ({ clientId }: { clientId: string | null }) =>
    `locations/${clientId}`,
  getUser: () => 'user',
  changeLanguage: ({ userId }: { userId: string }) => `user/${userId}/language`,

  getAllFavoriteMeters: ({ queryParams }: { queryParams: string }) =>
    `favoritemeter?${queryParams}`,

  //   Dashboard
  getDashboardTableData: () => `dashboard`,
  getDashboardTableDataOptions: ({ locale }: { locale: string }) =>
    `metadata?locale=${locale}`,
};

export default API_URLS;
