export const BASE_URL: string = 'https://app.stg.rhino.energy/api/app/';
export const VITE_WICKET_BASE_URL = 'https://app.stg.rhino.energy/';

const API_URLS = {
  //   Top Ribbon
  getClients: () => `clients`,
  getLocations: ({ clientId }: { clientId: string | null }) =>
    `clients/${clientId}/localisations-with-groups`,
  getGroups: ({ queryParams }: { queryParams: string }) =>
    `groups?${queryParams}`,
  getUser: () => 'user',
  changeLanguage: () => `user/language`,

  getAllFavoriteMeters: ({ queryParams }: { queryParams: string }) =>
    `favoritemeter?${queryParams}`,

  //   Dashboard
  getDashboardTableData: ({
    page,
    size,
    sortDirection,
    sortedField,
  }: {
    page: number | null;
    size: number | null;
    sortedField?: string;
    sortDirection?: string;
  }) =>
    `dashboard?page=${page}&size=${size}&sort=${sortedField},${sortDirection}`,
  getDashboardTableDataOptions: ({ locale }: { locale: string }) =>
    `metadata?locale=${locale}`,
};

export default API_URLS;
