export const VITE_API_BASE_URL: string = import.meta.env
  .VITE_API_BASE_URL as string;
export const VITE_WICKET_BASE_URL: string = import.meta.env
  .VITE_WICKET_BASE_URL as string;

const API_URLS = {
  // Clients
  getClients: () => `clients`,

  // Common
  getMeteringPointTypes: () => 'metering-point-types',
  getFeatureFlag: () => 'feature-flags',

  // Dashboard
  getDashboardTableData: () => `dashboard`,
  getDashboardTableDataOptions: () => `metadata`,

  getAssetDashboardTotalConsumptionCardData: () =>
    `asset-dashboard/total-consumption`,
  getAssetTotalConsumptionTableData: () => `asset-dashboard/table`,

  // FavoriteMeter
  getAllFavoriteMeters: () => `favoritemeter`,

  // Groups
  getGroups: () => `groups`,

  // Locations
  getLocations: ({ clientId }: { clientId: string | null }) =>
    `clients/${clientId}/localisations-with-groups`,

  // Measurement
  getMeasurements: () => `measurements`,
  getMeasurementInfo: ({ measurementUuid }: { measurementUuid: string }) =>
    `measurement/info/${measurementUuid}`,

  //Periodic Alarm
  getPeriodicAlarmList: () => `periodic-alarm`,
  deletePeriodicAlarm: (uuid: string) => `periodic-alarm/${uuid}`,
  createPeriodicAlarm: () => 'periodic-alarm',
  getExecutions: (uuid: string) => {
    return `periodic-alarm/${uuid}/executions`;
  },
  getPeriodicReportDownloadUrl: (uuid: string) => {
    return `periodic-alarm/report/${uuid}`;
  },
  getAlarmDetails: (uuid: string) => `periodic-alarm/${uuid}`,
  updateAlarm: (uuid: string) => `periodic-alarm/${uuid}`,

  //Tenants
  getTenants: () => 'tenants/all',

  // User
  getUser: () => 'user',
  changeLanguage: () => `user/language`,
};

export default API_URLS;
