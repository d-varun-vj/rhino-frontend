export enum Flag {
  ENABLE_REACT_DASHBOARD = 'enable_react_dashboard',
  ENABLE_REACT_DASHBOARD_FOR_SUPER_ADMIN = 'enable_react_dashboard_for_super_admin',
  ENABLE_PERIODIC_ALARM = 'enable_periodic_alarm',
  ENABLE_PERIODIC_ALARM_SMS_PANEL = 'enable_periodic_alarm_sms_panel',
  ENABLE_DASHBOARD_MULTISELECTOR = 'enable_dashboard_multiselector',
  ENABLE_ASSET_DASHBOARD = 'enable_asset_dashboard',
  ENABLE_ASSET_DASHBOARD_PERCENTAGE_CHANGE = 'enable_asset_dashboard_percentage_change',
}

export type Feature = Record<keyof typeof Flag, boolean>;
