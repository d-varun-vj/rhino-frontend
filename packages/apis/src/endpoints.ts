export const VITE_API_BASE_URL: string = import.meta.env
  .VITE_API_BASE_URL as string;
export const VITE_WICKET_BASE_URL: string = import.meta.env
  .VITE_WICKET_BASE_URL as string;

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

  //Periodic Alarm
  getPeriodicAlarmList: () => `periodic-alarm`,
};

export default API_URLS;
