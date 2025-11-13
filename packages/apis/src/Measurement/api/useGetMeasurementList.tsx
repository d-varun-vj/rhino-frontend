import { Sort } from '@rhino/utils';
import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { MeasurementListResponse } from '../types';

export type MeasurementRequestFilter = {
  page: number | null;
  size: number | null;
  sort: Sort;
  clientUuid?: string | null;
  locationUuid?: string | null;
  groupUuid?: string | null;
  locationName?: string | null;
  groupName?: string | null;
  measurementName?: string | null;
  timezone?: string | null;
  serialNumber?: string | null;
  tenants?: string | null;
  medium?: string | null;
  mediumMappId?: number | null;
  levelType?: string | null;
  loadType?: string | null;
  measurementType?: string | null;
  endUseAreaType?: string | null;
  onlyIncremental?: boolean | null;
};

export const useGetMeasurementList = (params: MeasurementRequestFilter) => {
  const {
    page,
    size,
    sort,
    clientUuid,
    locationUuid,
    groupUuid,
    locationName,
    groupName,
    measurementName,
    timezone,
    serialNumber,
    tenants,
    medium,
    mediumMappId,
    levelType,
    loadType,
    measurementType,
    endUseAreaType,
    onlyIncremental,
  } = params;

  const queryParams = {
    ...(!!page && { page }),
    ...(!!size && { size }),
    ...((sort?.field || sort?.direction) && {
      sort:
        sort.field && sort.direction
          ? `${sort.field},${sort.direction}`
          : sort.field || sort.direction,
    }),
    ...(!!clientUuid && { clientUuid }),
    ...(!!locationUuid && { locationUuid }),
    ...(!!groupUuid && { groupUuid }),
    ...(!!locationName && { locationName }),
    ...(!!groupName && { groupName }),
    ...(!!measurementName && { measurementName }),
    ...(!!timezone && { timezone }),
    ...(!!serialNumber && { serialNumber }),
    ...(!!tenants && { tenant: tenants }),
    ...(!!medium && { medium }),
    ...(!!mediumMappId && { mediumMappId }),
    ...(!!levelType && { levelType }),
    ...(!!loadType && { loadType }),
    ...(!!measurementType && { measurementType }),
    ...(!!endUseAreaType && { endUseAreaType }),
    ...(onlyIncremental !== undefined &&
      onlyIncremental !== null && { onlyIncremental }),
  };

  return useQuery({
    queryKey: [DataQueryKeys.MEASUREMENTS, queryParams],
    queryFn: async () => {
      const response = await httpClient.get<MeasurementListResponse>(
        API_URLS.getMeasurements(),
        { params: queryParams }
      );
      return response.data;
    },
    enabled:
      page !== null &&
      page !== undefined &&
      size !== null &&
      size !== undefined,
  });
};
