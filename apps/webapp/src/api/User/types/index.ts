export type User = {
  id: number;
  uuid: string;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  language: string;
  active: boolean;
  userType: UserType;
  created: string;
  measurements: string[] | null;
  clients: { name: string; uuid: string }[] | null;
  adminPermittedLocalisations: string[] | null;
  permissions: UserViewPermissions[] | null;
  tenants: string[] | null;
  licences: string[] | null;
  lastLogin: string | null;
  structureAccess: {
    resourceAccesses: string[] | null;
    assignedClientUuid: string | null;
  };
};

export enum UserType {
  SuperAdmin = 'SUPER_ADMIN',
  ClientAdmin = 'CLIENT_ADMIN',
  LocalisationAdmin = 'LOCALISATION_ADMIN',
  Tenant = 'TENANT',
  RegularUser = 'REGULAR_USER',
  TechnicalUser = 'TECHNICAL_USER',
  PartnerAdmin = 'PARTNER_ADMIN',
}

export enum ViewPermissionsType {
  UserTypeBased = 'USER_TYPE',
  ViewRoleBased = 'VIEW_ROLE',
}

export enum UserViewPermissions {
  HEAT_MAP_ROLE = 'HEAT_MAP',
  CONSUMPTION_CHART_ROLE = 'CONSUMPTION_CHART',
  CONSUMPTION_PROFILE_CHART_ROLE = 'CONSUMPTION_PROFILE_CHART',
  CONSUMPTION_REPORT_ROLE = 'CONSUMPTION_REPORT',
  CONSUMPTION_PROFILE_REPORT_ROLE = 'CONSUMPTION_PROFILE_REPORT',
  SIMPLIFIED_CONSUMPTION_REPORTS_ROLE = 'SIMPLIFIED_CONSUMPTION_REPORTS',
  POWER_REPORTS_ROLE = 'POWER_REPORTS',
  METER_VALUES_REPORT_ROLE = 'METER_VALUES_REPORT',
  MEASUREMENT_STRUCTURE_ROLE = 'MEASUREMENT_STRUCTURE',
  MEASUREMENT_ROLE = 'MEASUREMENT',
  UTILITY_COSTS_ROLE = 'UTILITY_COSTS',
  BALANCE_MODULE_ROLE = 'BALANCE_MODULE',
  IMMEDIATE_ALARM_ROLE = 'IMMEDIATE_ALARM',
  METER_STATES_ROLE = 'METER_STATES',
  SUPPORT_ROLE = 'SUPPORT',
}

export const getAnalysisViewPermissions = () => {
  return [
    UserViewPermissions.HEAT_MAP_ROLE,
    UserViewPermissions.CONSUMPTION_CHART_ROLE,
    UserViewPermissions.CONSUMPTION_PROFILE_CHART_ROLE,
    UserViewPermissions.CONSUMPTION_REPORT_ROLE,
    UserViewPermissions.CONSUMPTION_PROFILE_REPORT_ROLE,
    UserViewPermissions.SIMPLIFIED_CONSUMPTION_REPORTS_ROLE,
    UserViewPermissions.POWER_REPORTS_ROLE,
    UserViewPermissions.METER_VALUES_REPORT_ROLE,
    UserViewPermissions.MEASUREMENT_STRUCTURE_ROLE,
    UserViewPermissions.BALANCE_MODULE_ROLE,
    UserViewPermissions.UTILITY_COSTS_ROLE,
  ];
};

export const getConfigurtionViewPermissions = () => {
  return [
    UserViewPermissions.MEASUREMENT_ROLE,
    UserViewPermissions.METER_STATES_ROLE,
  ];
};
