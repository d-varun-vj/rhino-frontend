import { TableMeta } from '@rhino/utils';
import { NameWithTranslationDto } from '../../Common';

export type MeasurementFilter = {
  name: string;
  serialNumber: string;
  timezone: string;
  medium: string;
  type: NameWithTranslationDto | null;
  levelType: NameWithTranslationDto | null;
  loadType: NameWithTranslationDto | null;
  endUseArea: NameWithTranslationDto | null;
  location: string;
  group: string;
  tenants: string;
};

export interface MeasurementType {
  uuid: string;
  from: string | null;
  to: string | null;
  displayName: string;
  aggregate: boolean;
  type: string;
  levelType: NameWithTranslationDto | null;
  loadType: NameWithTranslationDto | null;
  endUseArea: NameWithTranslationDto | null;
  tenants: string;
  locationUuid: string | null;
  locationName: string | null;
  timezone: string;
  groupName: string | null;
  translatedMedium: string | null;
  serialNumber: string | null;
  incremental: boolean | null;
  virtual: boolean | null;
  factor: number | null;
  seriesUuid: string | null;
  chartLegendIndex: number | null;
  unit: string | null;
  showIncomplete: boolean | null;
  reaggregationStatus: string | null;
  reaggregationStatusUpdatedAt: string | null;
  subVirtualMeasurement: boolean | null;
  actions: string | null;
}

export type MeasurementListResponse = {
  data: MeasurementType[];
  meta: TableMeta;
};
