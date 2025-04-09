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
import { UserType, UserViewPermissions } from '../../../../api/User/types';

// export const VITE_WICKET_BASE_URL = 'https://app.stg.rhino.energy/';
export const VITE_WICKET_BASE_URL = 'http://localhost:8080/';

export type SubItemType = {
  label: string; // label from i18n translation (check src/i18n/...json)
  icon: IconType;
  key: string; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  wicketLink?: string;
  route?: string;
  viewPermissions?: UserViewPermissions[]; // This is used to check if the user has permission to access this item.
  allowedUserType?: UserType[]; // This is used to check if the user has permission to access this item.
};

export type MenuItemType = {
  label: string; // label from i18n translation (check src/i18n/...json)
  icon: IconType;
  subItems?: SubItemType[];
  key: string; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  link?: string; // This is mostly used when there are no sub-items and only serves to redirect to other links.
  viewPermissions?: UserViewPermissions[]; // This is used to check if the user has permission to access this item.
  allowedUserType?: UserType[]; // This is used to check if the user has permission to access this item.
};

export const MenuItems: MenuItemType[] = [
  // Dashboards
  {
    label: 'sideMenu.dashboards', // label from i18n translation (check src/i18n/...json)
    icon: FaTable,
    key: 'dashboards',
    subItems: [
      {
        label: 'sideMenu.dashboard',
        icon: FaTable,
        key: 'dashboard',
        route: '/dashboard',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
      {
        label: 'sideMenu.energyDashboard',
        icon: FaTable,
        key: 'energy-dashboard',
        wicketLink: VITE_WICKET_BASE_URL + 'energyDashboard',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
    ],
    allowedUserType: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.LocalisationAdmin,
      UserType.Tenant,
      UserType.RegularUser,
      UserType.PartnerAdmin,
    ],
    viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
  },
  //   Analysis and reports
  {
    label: 'sideMenu.analysisReports',
    icon: FaLightbulb,
    key: 'analysis-and-reports',
    subItems: [
      {
        label: 'sideMenu.consumptionChart',
        icon: FaChartLine,
        key: 'consumption',
        wicketLink: VITE_WICKET_BASE_URL + 'consumptionChart',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [
          UserViewPermissions.CLIENT_ADMIN_ROLE,
          UserViewPermissions.CONSUMPTION_CHART_ROLE,
        ],
      },
      {
        label: 'sideMenu.consumptionProfileChart',
        icon: FaChartBar,
        key: 'profile',
        wicketLink: VITE_WICKET_BASE_URL + 'consumptionProfileChart',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [
          UserViewPermissions.CLIENT_ADMIN_ROLE,
          UserViewPermissions.CONSUMPTION_PROFILE_CHART_ROLE,
        ],
      },
      {
        label: 'sideMenu.heatMap',
        icon: FaLightbulb,
        key: 'load-chart',
        wicketLink: VITE_WICKET_BASE_URL + 'heatmap',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [
          UserViewPermissions.CLIENT_ADMIN_ROLE,
          UserViewPermissions.HEAT_MAP_ROLE,
        ],
      },
      {
        label: 'sideMenu.measurementStructures',
        icon: BiSolidNetworkChart,
        key: 'structures',
        wicketLink: VITE_WICKET_BASE_URL + 'measurementStructures',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.MEASUREMENT_STRUCTURE_ROLE],
      },
      {
        label: 'sideMenu.balanceModule',
        icon: FaBalanceScale,
        key: 'balance',
        route: '/balance',
        wicketLink: VITE_WICKET_BASE_URL + 'balanceModule',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.BALANCE_MODULE_ROLE],
      },
      {
        label: 'sideMenu.report',
        icon: FaFile,
        key: 'reports',
        wicketLink: VITE_WICKET_BASE_URL + 'reports',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [
          UserViewPermissions.CLIENT_ADMIN_ROLE,
          UserViewPermissions.CONSUMPTION_REPORT_ROLE,
          UserViewPermissions.CONSUMPTION_PROFILE_REPORT_ROLE,
          UserViewPermissions.SIMPLIFIED_CONSUMPTION_REPORTS_ROLE,
          UserViewPermissions.POWER_REPORTS_ROLE,
          UserViewPermissions.METER_VALUES_REPORT_ROLE,
        ],
      },
      {
        label: 'sideMenu.utilityCosts',
        icon: FaWallet,
        key: 'utils-cost',
        wicketLink: VITE_WICKET_BASE_URL + 'utilityCosts',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.UTILITY_COSTS_ROLE],
      },
    ],
    allowedUserType: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.LocalisationAdmin,
      UserType.Tenant,
      UserType.RegularUser,
      UserType.PartnerAdmin,
    ],
    viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
  },
  //   Alarms and notifications
  {
    label: 'sideMenu.alarmsAndNotifications',
    icon: FaBell,
    key: 'alarms-and-notifications',
    subItems: [
      {
        label: 'sideMenu.immediateAlarm',
        icon: FaBell,
        key: 'immediate-alarm',
        wicketLink: VITE_WICKET_BASE_URL + 'alarms/immediate',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [
          UserViewPermissions.CLIENT_ADMIN_ROLE,
          UserViewPermissions.IMMEDIATE_ALARM_ROLE,
        ],
      },
    ],
    allowedUserType: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.LocalisationAdmin,
      UserType.Tenant,
      UserType.RegularUser,
      UserType.PartnerAdmin,
    ],
    viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
  },
  //   Configuration
  {
    label: 'sideMenu.configuration',
    icon: IoSettingsSharp,
    key: 'configuration',
    subItems: [
      {
        label: 'sideMenu.measurements',
        icon: FaTachometerAlt,
        key: 'measurements',
        wicketLink: VITE_WICKET_BASE_URL + 'measurements',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [
          UserViewPermissions.CLIENT_ADMIN_ROLE,
          UserViewPermissions.MEASUREMENT_ROLE,
        ],
      },
      {
        label: 'sideMenu.externalServiceConfiguration',
        icon: IoSettingsSharp,
        key: 'external-upcs-configuration',
        wicketLink: VITE_WICKET_BASE_URL + 'externalServicesConfiguration',
        allowedUserType: [UserType.SuperAdmin, UserType.PartnerAdmin],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
      {
        label: 'sideMenu.technicalView',
        icon: AiFillTool,
        key: 'technical-view',
        wicketLink: VITE_WICKET_BASE_URL + 'technical',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.PartnerAdmin,
          UserType.TechnicalUser,
        ],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
      {
        label: 'sideMenu.inputManagement',
        icon: IoSettingsSharp,
        key: 'input-management',
        wicketLink: VITE_WICKET_BASE_URL + 'inputManagement',
        allowedUserType: [UserType.SuperAdmin],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
      {
        label: 'sideMenu.maintenanceReport',
        icon: FaFile,
        key: 'system-maintenance-report',
        wicketLink: VITE_WICKET_BASE_URL + 'reports/maintenance',
        allowedUserType: [UserType.SuperAdmin],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
      {
        label: 'sideMenu.meterStates',
        icon: FaFile,
        key: 'meter-values',
        wicketLink: VITE_WICKET_BASE_URL + 'metersValues',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [
          UserViewPermissions.CLIENT_ADMIN_ROLE,
          UserViewPermissions.METER_STATES_ROLE,
        ],
      },
      {
        label: 'sideMenu.favoriteMeters',
        icon: FaStar,
        key: 'favorite-meters',
        wicketLink: VITE_WICKET_BASE_URL + 'favoritemeters',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.LocalisationAdmin,
          UserType.Tenant,
          UserType.RegularUser,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
    ],
    allowedUserType: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.LocalisationAdmin,
      UserType.Tenant,
      UserType.RegularUser,
      UserType.PartnerAdmin,
    ],
    viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
  },
  //   Administration
  {
    label: 'sideMenu.administration',
    icon: FaSuitcase,
    key: 'administration',
    subItems: [
      {
        label: 'sideMenu.clients',
        icon: FaSuitcase,
        key: 'clients',
        wicketLink: VITE_WICKET_BASE_URL + 'clients',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
      {
        label: 'sideMenu.users',
        icon: FaUser,
        key: 'users-management',
        wicketLink: VITE_WICKET_BASE_URL + 'users',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
      {
        label: 'sideMenu.tenants',
        icon: FaBuilding,
        key: 'tenants',
        wicketLink: VITE_WICKET_BASE_URL + 'tenants',
        allowedUserType: [
          UserType.SuperAdmin,
          UserType.ClientAdmin,
          UserType.PartnerAdmin,
        ],
        viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
      },
    ],
    allowedUserType: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.PartnerAdmin,
    ],
    viewPermissions: [UserViewPermissions.GLOBEL_ROLE],
  },
  //   Support
  {
    label: 'sideMenu.support',
    icon: FaQuestionCircle,
    key: 'support',
    link: 'https://support.rhino.energy/login_page.php',
    allowedUserType: [
      UserType.SuperAdmin,
      UserType.ClientAdmin,
      UserType.LocalisationAdmin,
      UserType.Tenant,
      UserType.RegularUser,
      UserType.PartnerAdmin,
    ],
    viewPermissions: [UserViewPermissions.SUPPORT_ROLE],
  },
];
