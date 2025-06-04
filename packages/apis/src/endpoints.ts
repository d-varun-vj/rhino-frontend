export const BASE_URL: string = 'https://app.stg.rhino.energy/api/app/';
export const VITE_WICKET_BASE_URL = 'https://app.stg.rhino.energy/';

const API_URLS = {
  //   Top Ribbon
  getClients: () => `clients`,
  getLocations: ({ clientId }: { clientId: string | null }) =>
    `clients/${clientId}/localisations-with-groups`,
  getGroups: () => `groups`,
  getUser: () => 'user',
  changeLanguage: () => `user/language`,

  getAllFavoriteMeters: () => `favoritemeter`,

  //   Dashboard
  getDashboardTableData: () => `dashboard`,
  getDashboardTableDataOptions: () => `metadata`,
};

export default API_URLS;
