import { Sort } from '@rhino/utils';
import { useQuery } from '@tanstack/react-query';
import { DataQueryKeys } from '../../data-query-keys';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { DashboardType } from '../types';

export type TableData = {
  content: DashboardType[];
  totalElements: number;
  size: number;
  page: number;
  empty: boolean;
};

export type DashboardTableRequestBody = {
  favoriteMeterUuid: string | null;
  page: number | null;
  size: number | null;
  clientUuid?: string | null;
  locationUuid?: string | null;
  groupUuid?: string | null;
  sort: Sort;
  locationName: string | null;
  groupName: string | null;
  measurementName: string | null;
  serialNumber: string | null;
  tenant: string | null;
  medium: string | null;
  levelType: string | null;
  loadType: string | null;
  endUseAreaType: string | null;
  percentageColor?: string | null;
};

export const useGetTableData = ({
  params,
}: {
  params: DashboardTableRequestBody;
}) => {
  const {
    page,
    size,
    sort,
    locationName,
    groupName,
    measurementName,
    serialNumber,
    tenant,
    medium,
    levelType,
    loadType,
    endUseAreaType,
    favoriteMeterUuid,
    clientUuid,
    locationUuid,
    groupUuid,
  } = params;

  const queryParams = {
    ...(!!page && { page }),
    ...(!!size && { size }),
    ...((sort.field || sort.direction) && {
      sort:
        sort.field && sort.direction
          ? `${sort.field},${sort.direction}`
          : sort.field || sort.direction,
    }),
    ...(!!locationName && { locationName }),
    ...(!!groupName && { groupName }),
    ...(!!measurementName && { measurementName }),
    ...(!!serialNumber && { serialNumber }),
    ...(!!tenant && { tenant }),
    ...(!!medium && { medium }),
    ...(!!levelType && { levelType }),
    ...(!!loadType && { loadType }),
    ...(!!endUseAreaType && { endUseAreaType }),
    ...(!!favoriteMeterUuid && { favoriteMeterUuid }),
    ...(!!clientUuid && { clientUuid }),
    ...(!!locationUuid && { locationUuid }),
    ...(!!groupUuid && { groupUuid }),
  };

  return useQuery({
    queryKey: [DataQueryKeys.DASHBOARD, queryParams],
    queryFn: async () => {
      const response = await httpClient.get<TableData>(
        API_URLS.getDashboardTableData(),
        { params: queryParams }
      );
      return response?.data;
    },
  });
};
