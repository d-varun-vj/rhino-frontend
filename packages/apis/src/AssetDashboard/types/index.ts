import { TableMeta } from '@rhino/utils';

export enum AssetDashboardMedium {
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS',
  WATER = 'WATER',
  HEAT = 'HEAT',
  COOLING = 'COOLING',
  CO2 = 'CO2',
}

export type AssetDashboardCardReq = {
  filter: AssetDashboardFilter;
  groupBy: AssetDashboardGroupBy[];
};

export type AssetDashboardFilter = {
  media: AssetDashboardMedium[];
  from: string;
  to: string;
  asset: Asset;
  assetName?: string;
};

export type Asset = {
  assetType: AssetType;
  uuids: string[];
};

export enum AssetType {
  CLIENT = 'CLIENT',
  LOCATION = 'LOCATION',
  GROUP = 'GROUP',
  MEASUREMENT = 'MEASUREMENT',
}

export enum AssetDashboardGroupBy {
  MEDIUM = 'MEDIUM',
  CLIENT = 'CLIENT',
  LOCATION = 'LOCATION',
  GROUP = 'GROUP',
  MEASUREMENT = 'MEASUREMENT',
}

export type AssetDashboardCardRes = {
  medium: AssetDashboardMedium;
  currentTotal: number;
  percentageChange: number;
  unit: string;
};

export type AssetDashboardTableRes = {
  data: AssetConsumptionTableData[];
  meta: TableMeta;
};

export type AssetConsumptionTableData = {
  assetName: string;
  assetUuid: string;
  assetType: AssetType;
  mediums: MediumTableConsumption[];
};

export type MediumTableConsumption = {
  type: AssetDashboardMedium;
  value: number;
  unit: string;
  total: number;
};
