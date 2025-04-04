export type DictionaryDto = {
  name: string;
  translationEn: string;
  translationPl: string;
};
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
  readTime: null | string;
  translatedMedium: string | null;
  serialNumber: string | null;
  tenant: string | null;
  incremental: boolean | null;
  manual: boolean | null;
  levelType: null | DictionaryDto;
  loadType: null | DictionaryDto;
  endUseArea: null | DictionaryDto;
  percentageColor: string | null;
  type: string | null;
  action?: string;
};

export type Filter = {
  locationName: string;
  groupName: string;
  measurementName: string;
  serialNumber: string;
  tenant: string;
  medium: string;
  levelType: string;
  loadType: string;
  endUserAreaType: string;
};

export type Sort = {
  field: string;
  direction: string;
};

export type Pagination = {
  page: number;
  size: number;
};
