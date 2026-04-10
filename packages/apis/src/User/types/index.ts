export type User = {
  id: number;
  uuid: string;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  language: string;
  active: boolean;
  userType: UserType;
  measurements: string[] | null;
  clients: { name: string; uuid: string; useAggregateData: boolean }[] | null;
  selectedLocation: { name: string; uuid: string } | null;
  permissions: UserViewPermission[] | null;
  selectedClient: {
    name: string;
    uuid: string;
    useAggregateData: boolean;
  } | null;
  selectedGroup: { name: string; uuid: string } | null;
  zoneId: 'Europe/Warsaw';
  inactive: false;
  structureAccess: {
    resourceAccesses:
      | {
          empty_access: boolean;
          source_type: string;
          source_uuid: string;
        }[]
      | null;
    assignedClientUuid: null;
  } | null;
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

export enum UserViewPermission {
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
  PERIODIC_ALARM_ROLE = 'PERIODIC_ALARM',
  ASSET_DASHBOARD_ROLE = 'ASSET_DASHBOARD',
  METER_STATES_ROLE = 'METER_STATES',
  SUPPORT_ROLE = 'SUPPORT',
}
