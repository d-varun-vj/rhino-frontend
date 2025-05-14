import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../api/httpClient';
import API_URLS from '../../../api/endpoints';
import { DashboardType } from '../types';

export type TableData = {
  results: DashboardType[];
  totalCount: number;
  countPerPage: number;
};

export type DashboardTableRequestBody = {
  measurementUuids: string[] | null;
  clientUuids: string[] | null;
  localisationUuids: string[] | null;
  page?: number | null;
  size?: number | null;
  clientId?: string | null;
  locationUuid?: string | null;
  groupUuid?: string | null;
  sortedField: string | null;
  sortDirection: string | null;
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
  return useMutation({
    mutationFn: async () => {
      const result = await httpClient.post<TableData>(
        API_URLS.getDashboardTableData(),
        params
      );
      return result?.data;
    },
  });
};
