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

export const VITE_WICKET_BASE_URL = 'https://app.stg.rhino.energy/';
// export const VITE_WICKET_BASE_URL = 'http://localhost:8080/';

export type SubItemType = {
  label: string;
  icon: IconType;
  key: string; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  wicketLink?: string;
  route?: string;
};

export type MenuItemType = {
  label: string;
  icon: IconType;
  subItems?: SubItemType[];
  key: string; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  link?: string; // This is mostly used when there are no sub-items and only serves to redirect to other links.
};

export const MenuItems: MenuItemType[] = [
  // Dashboards
  {
    label: 'Dashboards',
    icon: FaTable,
    key: 'dashboards',
    subItems: [
      {
        label: 'Dashboard',
        icon: FaTable,
        key: 'wdashboard',
        route: '/wdashboard',
        wicketLink: VITE_WICKET_BASE_URL + 'dashboard',
      },
      {
        label: 'Energy dashboard',
        icon: FaTable,
        key: 'energy-dashboard',
        wicketLink: VITE_WICKET_BASE_URL + 'energyDashboard',
      },
      {
        label: 'Dashboard (R)',
        icon: LuRectangleVertical,
        key: 'dashboard',
        route: '/dashboard',
      },
    ],
  },
  //   Analysis and reports
  {
    label: 'Analysis and reports',
    icon: FaLightbulb,
    key: 'analysis-and-reports',
    subItems: [
      {
        label: 'Consumption',
        icon: FaChartLine,
        key: 'consumption',
        wicketLink: VITE_WICKET_BASE_URL + 'consumptionChart',
      },
      {
        label: 'Profile',
        icon: FaChartBar,
        key: 'profile',
        wicketLink: VITE_WICKET_BASE_URL + 'consumptionProfileChart',
      },
      {
        label: 'Load Chart',
        icon: FaLightbulb,
        key: 'load-chart',
        wicketLink: VITE_WICKET_BASE_URL + 'heatmap',
      },
      {
        label: 'Structures',
        icon: BiSolidNetworkChart,
        key: 'structures',
        wicketLink: VITE_WICKET_BASE_URL + 'measurementStructures',
      },
      {
        label: 'Balance module',
        icon: FaBalanceScale,
        key: 'balance',
        route: '/balance',
        wicketLink: VITE_WICKET_BASE_URL + 'balanceModule',
      },
      {
        label: 'Reports',
        icon: FaFile,
        key: 'reports',
        wicketLink: VITE_WICKET_BASE_URL + 'reports',
      },
      {
        label: 'Utility costs',
        icon: FaWallet,
        key: 'utils-cost',
        wicketLink: VITE_WICKET_BASE_URL + 'utilityCosts',
      },
    ],
  },
  //   Alarms and notifications
  {
    label: 'Alarms and notifications',
    icon: FaBell,
    key: 'alarms-and-notifications',
    subItems: [
      {
        label: 'Immediate alarm',
        icon: FaBell,
        key: 'immediate-alarm',
        wicketLink: VITE_WICKET_BASE_URL + 'alarms/immediate',
      },
    ],
  },
  //   Configuration
  {
    label: 'Configuration',
    icon: IoSettingsSharp,
    key: 'configuration',
    subItems: [
      {
        label: 'Measurements',
        icon: FaTachometerAlt,
        key: 'measurements',
        wicketLink: VITE_WICKET_BASE_URL + 'measurements',
      },
      {
        label: 'External UPCs configuration',
        icon: IoSettingsSharp,
        key: 'external-upcs-configuration',
        wicketLink: VITE_WICKET_BASE_URL + 'externalServicesConfiguration',
      },
      {
        label: 'Technical view',
        icon: AiFillTool,
        key: 'technical-view',
        wicketLink: VITE_WICKET_BASE_URL + 'technical',
      },
      {
        label: 'Input management',
        icon: IoSettingsSharp,
        key: 'input-management',
        wicketLink: VITE_WICKET_BASE_URL + 'inputManagement',
      },
      {
        label: 'System maintenance report',
        icon: FaFile,
        key: 'system-maintenance-report',
        wicketLink: VITE_WICKET_BASE_URL + 'reports/maintenance',
      },
      {
        label: 'Meters values',
        icon: FaFile,
        key: 'meter-values',
        wicketLink: VITE_WICKET_BASE_URL + 'metersValues',
      },
      {
        label: 'Favorite meters',
        icon: FaStar,
        key: 'favorite-meters',
        wicketLink: VITE_WICKET_BASE_URL + 'favoritemeters',
      },
    ],
  },
  //   Administration
  {
    label: 'Administration',
    icon: FaSuitcase,
    key: 'administration',
    subItems: [
      {
        label: 'Clients',
        icon: FaSuitcase,
        key: 'clients',
        wicketLink: VITE_WICKET_BASE_URL + 'clients',
      },
      {
        label: 'Users management',
        icon: FaUser,
        key: 'users-management',
        wicketLink: VITE_WICKET_BASE_URL + 'users',
      },
      {
        label: 'Tenants',
        icon: FaBuilding,
        key: 'tenants',
        wicketLink: VITE_WICKET_BASE_URL + 'tenants',
      },
    ],
  },
  //   Support
  {
    label: 'Support',
    icon: FaQuestionCircle,
    key: 'support',
    link: 'https://support.rhino.energy/login_page.php',
  },
];
