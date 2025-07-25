import { NameWithTranslationDto } from '../../Common';

export type DashboardType = {
  id: string;
  groupName: string;
  localisationName: string;
  measurementName: string | null;
  factor: number | null;
  value: string | null;
  percentage: string | null;
  currentMonthConsumption: string | null;
  lastMonthSameDayConsumption: string | null;
  lastMonthConsumption: string | null;
  unit: string | null;
  readTime: string | null;
  translatedMedium: string | null;
  serialNumber: string | null;
  tenant: string | null;
  incremental: boolean | null;
  manual: boolean | null;
  levelType: NameWithTranslationDto | null;
  loadType: NameWithTranslationDto | null;
  endUseArea: NameWithTranslationDto | null;
  percentageColor?: string | null;
  type: string | null;
  action?: string;
};

export type Filter = {
  locationName: string | null;
  groupName: string | null;
  measurementName: string | null;
  serialNumber: string | null;
  tenant: string | null;
  medium: string | null;
  levelType: string | null;
  loadType: string | null;
  endUseAreaType: string | null;
};
