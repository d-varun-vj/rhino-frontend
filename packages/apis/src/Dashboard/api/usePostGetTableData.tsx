import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../httpClient';
import { DashboardType } from '../types';
import API_URLS from '../../endpoints';

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
  clientId?: string | null;
  locationUuid?: string | null;
  groupUuid?: string | null;
  sortedField?: string;
  sortDirection?: string;
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

export const usePostGetTableData = ({
  params,
}: {
  params: DashboardTableRequestBody;
}) => {
  const {
    page,
    size,
    sortDirection,
    sortedField,
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
    clientId,
    locationUuid,
    groupUuid,
  } = params;

  return useMutation({
    mutationFn: async () => {
      const result = await httpClient.post<TableData>(
        API_URLS.getDashboardTableData(),
        {
          params: {
            ...(!!page && { page }),
            ...(!!size && { size }),
            ...(!!sortDirection && { sortDirection }),
            ...(sortedField?.length && { sort: sortedField }),
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
            ...(!!clientId && { clientId }),
            ...(!!locationUuid && { locationUuid }),
            ...(!!groupUuid && { groupUuid }),
          },
        }
      );
      return result?.data;
    },
  });
};
