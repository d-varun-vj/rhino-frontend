import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../../api/endpoints';
import { httpClient } from '../../../api/httpClient';
import { VITE_WICKET_BASE_URL } from '../../../components/shared/Sidebar/data';
import { DashboardType, DictionaryDto } from '../types';
import { DATA_QUERY_KEYS } from '../../../api/data-query-keys';
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
};

export const getTableData = ({
  requestBody,
}: {
  requestBody?: DashboardTableRequestBody;
}): Promise<TableData> => {
  return new Promise<TableData>((resolve, reject) => {
    httpClient
      .post<TableData>(API_URLS.getDashboardTableData(), requestBody)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        window.location.href = VITE_WICKET_BASE_URL + 'login';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(error.response?.data);
      });
  });
};

export const useGetTableData = ({
  requestBody,
  queryKeys,
  user,
}: {
  requestBody?: DashboardTableRequestBody;
  queryKeys: unknown[];
  user: User | null;
}) => {
  return useQuery({
    queryKey: [...DATA_QUERY_KEYS.dashboard, ...queryKeys],
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
    queryKey: [DATA_QUERY_KEYS.options],
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

// export const getOptions = ({ locale }: { locale: string | null }) => {
//   return new Promise<Options>((resolve, reject) => {
//     httpClient
//       .get<Options>(
//         API_URLS.getDashboardTableDataOptions({
//           locale: locale ? locale : 'en',
//         })
//       )
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
//         reject(error.response?.data);
//       });
//   });
// };
