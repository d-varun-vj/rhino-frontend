import {
  FaBalanceScale,
  FaBell,
  FaBuilding,
  FaChartBar,
  FaChartLine,
  FaFile,
  FaLightbulb,
  FaQuestionCircle,
  FaStar,
  FaSuitcase,
  FaTable,
  FaTachometerAlt,
  FaUser,
  FaWallet,
} from 'react-icons/fa';
import { BiSolidNetworkChart } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';
import { AiFillTool } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import {
  getAnalysisViewPermissions,
  getConfigurtionViewPermissions,
  UserType,
  UserViewPermission,
  ViewPermissionsType,
} from '@rhino/apis';
import { VITE_WICKET_BASE_URL } from '@rhino/apis';

export type SubItemType = {
  label: string; // label from i18n translation (check src/i18n/...json)
  icon: IconType;
  key: string; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  wicketLink?: string;
  route?: string;
  viewPermissionType: ViewPermissionsType;
  viewPermissions?: UserViewPermission[]; // This is used to check if the user has permission to access this item.
  allowedUserTypes?: UserType[]; // This is used to check if the user has permission to access this item.
};

export type MenuItemType = {
  label: string; // label from i18n translation (check src/i18n/...json)
  icon: IconType;
  subItems?: SubItemType[];
  key: MenuKeys; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  link?: string; // This is mostly used when there are no sub-items and only serves to redirect to other links.
  viewPermissionType: ViewPermissionsType;
  viewPermissions?: UserViewPermission[]; // This is used to check if the user has permission to access this item.
  allowedUserTypes?: UserType[]; // This is used to check if the user has permission to access this item.
};

export enum MenuKeys {
  DASHBOARD = 'dashboards',
  ANALYSIS_AND_REPORTS = 'analysis-and-reports',
  ALARMS_AND_NOTIFICATIONS = 'alarms-and-notifications',
  CONFIGURATION = 'configuration',
  ADMINISTRATION = 'administration',
  SUPPORT = 'support',
}

export const MenuItems: MenuItemType[] = [
  // Dashboards
  {
    label: 'sideMenu.dashboards', // label from i18n (check src/i18n/...json)
    icon: FaTable,
    key: MenuKeys.DASHBOARD,
    subItems: [
      {
        label: 'sideMenu.dashboard',
        icon: FaTable,
        key: 'dashboard',
        route: '/dashboard',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
      },
      {
        label: 'sideMenu.energyDashboard',
        icon: FaTable,
        key: 'energy-dashboard',
        wicketLink: VITE_WICKET_BASE_URL + 'energyDashboard',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
      },
    ],
    viewPermissionType: ViewPermissionsType.UserTypeBased,
    allowedUserTypes: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.LocalisationAdmin,
      UserType.Tenant,
      UserType.RegularUser,
      UserType.PartnerAdmin,
    ],
  },
  //   Analysis and reports
  {
    label: 'sideMenu.analysisReports',
    icon: FaLightbulb,
    key: MenuKeys.ANALYSIS_AND_REPORTS,
    subItems: [
      {
        label: 'sideMenu.consumptionChart',
        icon: FaChartLine,
        key: 'consumption',
        wicketLink: VITE_WICKET_BASE_URL + 'consumptionChart',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.CONSUMPTION_CHART_ROLE],
      },
      {
        label: 'sideMenu.consumptionProfileChart',
        icon: FaChartBar,
        key: 'profile',
        wicketLink: VITE_WICKET_BASE_URL + 'consumptionProfileChart',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.CONSUMPTION_PROFILE_CHART_ROLE],
      },
      {
        label: 'sideMenu.heatMap',
        icon: FaLightbulb,
        key: 'load-chart',
        wicketLink: VITE_WICKET_BASE_URL + 'heatmap',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.HEAT_MAP_ROLE],
      },
      {
        label: 'sideMenu.measurementStructures',
        icon: BiSolidNetworkChart,
        key: 'structures',
        wicketLink: VITE_WICKET_BASE_URL + 'measurementStructures',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.MEASUREMENT_STRUCTURE_ROLE],
      },
      {
        label: 'sideMenu.balanceModule',
        icon: FaBalanceScale,
        key: 'balance',
        route: '/balance',
        wicketLink: VITE_WICKET_BASE_URL + 'balanceModule',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.BALANCE_MODULE_ROLE],
      },
      {
        label: 'sideMenu.report',
        icon: FaFile,
        key: 'reports',
        wicketLink: VITE_WICKET_BASE_URL + 'reports',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [
          UserViewPermission.CONSUMPTION_REPORT_ROLE,
          UserViewPermission.CONSUMPTION_PROFILE_REPORT_ROLE,
          UserViewPermission.SIMPLIFIED_CONSUMPTION_REPORTS_ROLE,
          UserViewPermission.POWER_REPORTS_ROLE,
          UserViewPermission.METER_VALUES_REPORT_ROLE,
        ],
      },
      {
        label: 'sideMenu.utilityCosts',
        icon: FaWallet,
        key: 'utils-cost',
        wicketLink: VITE_WICKET_BASE_URL + 'utilityCosts',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.UTILITY_COSTS_ROLE],
      },
    ],
    viewPermissionType: ViewPermissionsType.ViewRoleBased,
    viewPermissions: [...getAnalysisViewPermissions()],
  },
  //   Alarms and notifications
  {
    label: 'sideMenu.alarmsAndNotifications',
    icon: FaBell,
    key: MenuKeys.ALARMS_AND_NOTIFICATIONS,
    subItems: [
      {
        label: 'sideMenu.immediateAlarm',
        icon: FaBell,
        key: 'immediate-alarm',
        wicketLink: VITE_WICKET_BASE_URL + 'alarms/immediate',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.IMMEDIATE_ALARM_ROLE],
      },
    ],
    viewPermissionType: ViewPermissionsType.ViewRoleBased,
    viewPermissions: [UserViewPermission.IMMEDIATE_ALARM_ROLE],
  },
  //   Configuration
  {
    label: 'sideMenu.configuration',
    icon: IoSettingsSharp,
    key: MenuKeys.CONFIGURATION,
    subItems: [
      {
        label: 'sideMenu.measurements',
        icon: FaTachometerAlt,
        key: 'measurements',
        wicketLink: VITE_WICKET_BASE_URL + 'measurements',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.MEASUREMENT_ROLE],
      },
      {
        label: 'sideMenu.externalServiceConfiguration',
        icon: IoSettingsSharp,
        key: 'external-upcs-configuration',
        wicketLink: VITE_WICKET_BASE_URL + 'externalServicesConfiguration',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [UserType.SuperAdmin, UserType.PartnerAdmin],
      },
      {
        label: 'sideMenu.technicalView',
        icon: AiFillTool,
        key: 'technical-view',
        wicketLink: VITE_WICKET_BASE_URL + 'technical',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [
          UserType.SuperAdmin,
          UserType.PartnerAdmin,
          UserType.TechnicalUser,
        ],
      },
      {
        label: 'sideMenu.inputManagement',
        icon: IoSettingsSharp,
        key: 'input-management',
        wicketLink: VITE_WICKET_BASE_URL + 'inputManagement',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [UserType.SuperAdmin],
      },
      {
        label: 'sideMenu.maintenanceReport',
        icon: FaFile,
        key: 'system-maintenance-report',
        wicketLink: VITE_WICKET_BASE_URL + 'reports/maintenance',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [UserType.SuperAdmin],
      },
      {
        label: 'sideMenu.meterStates',
        icon: FaFile,
        key: 'meter-values',
        wicketLink: VITE_WICKET_BASE_URL + 'metersValues',
        viewPermissionType: ViewPermissionsType.ViewRoleBased,
        viewPermissions: [UserViewPermission.METER_STATES_ROLE],
      },
      {
        label: 'sideMenu.favoriteMeters',
        icon: FaStar,
        key: 'favorite-meters',
        wicketLink: VITE_WICKET_BASE_URL + 'favoritemeters',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
      },
    ],
    viewPermissionType: ViewPermissionsType.UserTypeBased,
    allowedUserTypes: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.LocalisationAdmin,
      UserType.Tenant,
      UserType.RegularUser,
      UserType.PartnerAdmin,
    ],
    viewPermissions: [...getConfigurtionViewPermissions()],
  },
  //   Administration
  {
    label: 'sideMenu.administration',
    icon: FaSuitcase,
    key: MenuKeys.ADMINISTRATION,
    subItems: [
      {
        label: 'sideMenu.clients',
        icon: FaSuitcase,
        key: 'clients',
        wicketLink: VITE_WICKET_BASE_URL + 'clients',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.PartnerAdmin,
        ],
      },
      {
        label: 'sideMenu.users',
        icon: FaUser,
        key: 'users-management',
        wicketLink: VITE_WICKET_BASE_URL + 'users',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.PartnerAdmin,
        ],
      },
      {
        label: 'sideMenu.tenants',
        icon: FaBuilding,
        key: 'tenants',
        wicketLink: VITE_WICKET_BASE_URL + 'tenants',
        viewPermissionType: ViewPermissionsType.UserTypeBased,
        allowedUserTypes: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.PartnerAdmin,
        ],
      },
    ],
    viewPermissionType: ViewPermissionsType.UserTypeBased,
    allowedUserTypes: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.PartnerAdmin,
    ],
  },
  //   Support
  {
    label: 'sideMenu.support',
    icon: FaQuestionCircle,
    key: MenuKeys.SUPPORT,
    link: 'https://support.rhino.energy/login_page.php',
    viewPermissionType: ViewPermissionsType.ViewRoleBased,
    viewPermissions: [UserViewPermission.SUPPORT_ROLE],
  },
];
