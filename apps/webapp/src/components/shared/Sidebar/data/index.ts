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
import { LuRectangleVertical } from 'react-icons/lu';

// export const VITE_WICKET_BASE_URL = 'https://app.stg.rhino.energy/';
export const VITE_WICKET_BASE_URL = 'http://localhost:8080/';

export type SubItemType = {
  label: string; // label from i18n translation (check src/i18n/...json)
  icon: IconType;
  key: string; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  wicketLink?: string;
  route?: string;
};

export type MenuItemType = {
  label: string; // label from i18n translation (check src/i18n/...json)
  icon: IconType;
  subItems?: SubItemType[];
  key: string; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  link?: string; // This is mostly used when there are no sub-items and only serves to redirect to other links.
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
        key: 'wdashboard',
        route: '/wdashboard',
        wicketLink: VITE_WICKET_BASE_URL + 'dashboard',
      },
      {
        label: 'sideMenu.energyDashboard',
        icon: FaTable,
        key: 'energy-dashboard',
        wicketLink: VITE_WICKET_BASE_URL + 'energyDashboard',
      },
      {
        label: 'sideMenu.dashboardR',
        icon: LuRectangleVertical,
        key: 'dashboard',
        route: '/dashboard',
      },
    ],
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
      },
      {
        label: 'sideMenu.consumptionProfileChart',
        icon: FaChartBar,
        key: 'profile',
        wicketLink: VITE_WICKET_BASE_URL + 'consumptionProfileChart',
      },
      {
        label: 'sideMenu.heatMap',
        icon: FaLightbulb,
        key: 'load-chart',
        wicketLink: VITE_WICKET_BASE_URL + 'heatmap',
      },
      {
        label: 'sideMenu.measurementStructures',
        icon: BiSolidNetworkChart,
        key: 'structures',
        wicketLink: VITE_WICKET_BASE_URL + 'measurementStructures',
      },
      {
        label: 'sideMenu.balanceModule',
        icon: FaBalanceScale,
        key: 'balance',
        route: '/balance',
        wicketLink: VITE_WICKET_BASE_URL + 'balanceModule',
      },
      {
        label: 'sideMenu.report',
        icon: FaFile,
        key: 'reports',
        wicketLink: VITE_WICKET_BASE_URL + 'reports',
      },
      {
        label: 'sideMenu.utilityCosts',
        icon: FaWallet,
        key: 'utils-cost',
        wicketLink: VITE_WICKET_BASE_URL + 'utilityCosts',
      },
    ],
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
      },
    ],
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
      },
      {
        label: 'sideMenu.externalServiceConfiguration',
        icon: IoSettingsSharp,
        key: 'external-upcs-configuration',
        wicketLink: VITE_WICKET_BASE_URL + 'externalServicesConfiguration',
      },
      {
        label: 'sideMenu.technicalView',
        icon: AiFillTool,
        key: 'technical-view',
        wicketLink: VITE_WICKET_BASE_URL + 'technical',
      },
      {
        label: 'sideMenu.inputManagement',
        icon: IoSettingsSharp,
        key: 'input-management',
        wicketLink: VITE_WICKET_BASE_URL + 'inputManagement',
      },
      {
        label: 'sideMenu.maintenanceReport',
        icon: FaFile,
        key: 'system-maintenance-report',
        wicketLink: VITE_WICKET_BASE_URL + 'reports/maintenance',
      },
      {
        label: 'sideMenu.meterStates',
        icon: FaFile,
        key: 'meter-values',
        wicketLink: VITE_WICKET_BASE_URL + 'metersValues',
      },
      {
        label: 'sideMenu.favoriteMeters',
        icon: FaStar,
        key: 'favorite-meters',
        wicketLink: VITE_WICKET_BASE_URL + 'favoritemeters',
      },
    ],
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
      },
      {
        label: 'sideMenu.users',
        icon: FaUser,
        key: 'users-management',
        wicketLink: VITE_WICKET_BASE_URL + 'users',
      },
      {
        label: 'sideMenu.tenants',
        icon: FaBuilding,
        key: 'tenants',
        wicketLink: VITE_WICKET_BASE_URL + 'tenants',
      },
    ],
  },
  //   Support
  {
    label: 'sideMenu.support',
    icon: FaQuestionCircle,
    key: 'support',
    link: 'https://support.rhino.energy/login_page.php',
  },
];
