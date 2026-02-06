export enum Flag {
  ENABLE_PERIODIC_ALARM = 'enable_periodic_alarm',
  ENABLE_PERIODIC_ALARM_SMS_PANEL = 'enable_periodic_alarm_sms_panel',
  ENABLE_DASHBOARD_MULTISELECTOR = 'enable_dashboard_multiselector',
}

export type Feature = Record<keyof typeof Flag, boolean>;

export const getFeature = (
  features: Feature,
  flag: keyof typeof Flag
): boolean => {
  return features[flag];
};
