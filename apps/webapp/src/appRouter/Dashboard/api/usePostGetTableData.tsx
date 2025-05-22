import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../api/httpClient';
import API_URLS from '../../../api/endpoints';
import { DashboardType } from '../types';

export type TableData = {
  content: DashboardType[];
  totalElements: number;
  size: number;
  page: number;
  empty: boolean;
};

export type DashboardTableRequestBody = {
  measurementUuids: string[] | null;
  favoriteMeterUuids: string[] | null;
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
  const { page, size, sortDirection, sortedField, ...body } = params;
  return useMutation({
    mutationFn: async () => {
      const result = await httpClient.post<TableData>(
        API_URLS.getDashboardTableData({
          page,
          size,
          sortDirection,
          sortedField,
        }),
        body
      );
      return result?.data;
    },
  });
};
