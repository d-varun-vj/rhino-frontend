import dashboardEn from './dashboard/en.json';
import dashboardPl from './dashboard/pl.json';
import periodicAlarmEn from './periodicAlarm/en.json';
import periodicAlarmPl from './periodicAlarm/pl.json';

type Language = 'en' | 'pl';

interface Page {
  dashboard: unknown;
  periodicAlarm: unknown;
}

export const pagesResources: Record<Language, Page> = {
  en: {
    dashboard: dashboardEn,
    periodicAlarm: periodicAlarmEn,
  },
  pl: {
    dashboard: dashboardPl,
    periodicAlarm: periodicAlarmPl,
  },
};
