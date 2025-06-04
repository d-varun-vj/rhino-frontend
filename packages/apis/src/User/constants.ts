import { UserViewPermission } from './types';

export const getAnalysisViewPermissions = () => {
  return [
    UserViewPermission.HEAT_MAP_ROLE,
    UserViewPermission.CONSUMPTION_CHART_ROLE,
    UserViewPermission.CONSUMPTION_PROFILE_CHART_ROLE,
    UserViewPermission.CONSUMPTION_REPORT_ROLE,
    UserViewPermission.CONSUMPTION_PROFILE_REPORT_ROLE,
    UserViewPermission.SIMPLIFIED_CONSUMPTION_REPORTS_ROLE,
    UserViewPermission.POWER_REPORTS_ROLE,
    UserViewPermission.METER_VALUES_REPORT_ROLE,
    UserViewPermission.MEASUREMENT_STRUCTURE_ROLE,
    UserViewPermission.BALANCE_MODULE_ROLE,
    UserViewPermission.UTILITY_COSTS_ROLE,
  ];
};

export const getConfigurationViewPermissions = () => {
  return [
    UserViewPermission.MEASUREMENT_ROLE,
    UserViewPermission.METER_STATES_ROLE,
  ];
};
