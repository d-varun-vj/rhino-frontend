import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../../api/endpoints';
import { httpClient } from '../../../api/httpClient';
import { DashboardType, DictionaryDto } from '../types';
import { DataQueryKeys } from '../../../api/data-query-keys';
import { User } from '../../../api/User/types';

type Options = {
  levelTypes: DictionaryDto[];
  loadTypes: DictionaryDto[];
  endUserAreaTypes: DictionaryDto[];
};

type TableData = {
  results: DashboardType[];
  totalCount: number;
  countPerPage: number;
};

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

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
  endUserAreaType: string | null;
  user: User | null;
};

export const useGetTableData = ({
  params,
}: {
  params: DashboardTableRequestBody;
}) => {
  const { user, ...requestBody } = params;

  return useQuery({
    queryKey: [DataQueryKeys.DASHBOARD, JSON.stringify(requestBody)],
    queryFn: async () => {
      const response = await httpClient.post<TableData>(
        API_URLS.getDashboardTableData(),
        requestBody
      );
      return response.data;
    },
    enabled: !!user,
  });
};

export const useGetOptions = ({ locale }: { locale: string | null }) => {
  return useQuery({
    queryKey: [DataQueryKeys.OPTIONS],
    queryFn: async () => {
      const response = await httpClient.get<Options>(
        API_URLS.getDashboardTableDataOptions({
          locale: locale ? locale : 'en',
        })
      );
      return response.data;
    },
  });
};
