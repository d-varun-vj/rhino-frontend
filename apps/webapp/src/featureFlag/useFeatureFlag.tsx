import { useFlag } from '@unleash/proxy-client-react';
import { Feature, Flag } from './feature';

export const useFeatureFlags = (): Feature => {
  return {
    ENABLE_PERIODIC_ALARM: useFlag(Flag.ENABLE_PERIODIC_ALARM) || false,
    ENABLE_PERIODIC_ALARM_SMS_PANEL:
      useFlag(Flag.ENABLE_PERIODIC_ALARM_SMS_PANEL) || false,
    ENABLE_DASHBOARD_MULTISELECTOR:
      useFlag(Flag.ENABLE_DASHBOARD_MULTISELECTOR) || false,
  };
};
