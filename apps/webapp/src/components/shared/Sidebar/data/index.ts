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

const VITE_WICKET_BASE_URL = 'https://app.stg.rhino.energy/';

export type SubItemType = {
  label: string;
  icon: IconType;
  key: string; // This is for identifying which item is active (label in lowercase, connected with hyphens).
  component?: React.ComponentType; // This shows the component when the item is active.
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
        key: 'dashboard',
        route: '/dashboard',
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
        key: 'tenant-dashboard',
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
        wicketLink: VITE_WICKET_BASE_URL + 'consumptionChart', // https://app.stg.rhino.energy/
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
      },
      {
        label: 'External UPCs configuration',
        icon: IoSettingsSharp,
        key: 'external-upcs-configuration',
      },
      {
        label: 'Technical view',
        icon: AiFillTool,
        key: 'technical-view',
      },
      {
        label: 'Input management',
        icon: IoSettingsSharp,
        key: 'input-management',
      },
      {
        label: 'System maintenance report',
        icon: FaFile,
        key: 'system-maintenance-report',
      },
      {
        label: 'Meters values',
        icon: FaFile,
        key: 'meter-values',
      },
      {
        label: 'Favorite meters',
        icon: FaStar,
        key: 'favorite-meters',
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
      },
      {
        label: 'Users management',
        icon: FaUser,
        key: 'users-management',
      },
      {
        label: 'Tenants',
        icon: FaBuilding,
        key: 'tenants',
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
