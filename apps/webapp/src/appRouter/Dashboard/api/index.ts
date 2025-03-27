import API_URLS, { BASE_URL } from '../../../api/endpoints';
import { initHttpClient } from '../../../api/httpClient';
import { VITE_WICKET_BASE_URL } from '../../../components/shared/Sidebar/data';
import { DashboardType, DictionaryDto } from '../types';

type Options = {
  levelTypes: DictionaryDto[];
  loadTypes: DictionaryDto[];
  endUserAreaTypes: DictionaryDto[];
};

type TableData = {
  results: DashboardType[];
  totalCount: number;
  countPerPage: number;
  options?: Options;
};

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const getTableData = ({
  page,
  size,
  clientId,
  locationUuid,
  groupUuid,
  locationName,
  groupName,
  measurementName,
  serialNumber,
  tenant,
  medium,
  levelType,
  loadType,
  endUserAreaType,
  sortedField,
  sortDirection,
}: {
  page?: number | null;
  size?: number | null;
  clientId?: string | null;
  locationUuid?: string | null;
  groupUuid?: string | null;
  locationName?: string | null;
  groupName?: string | null;
  measurementName?: string | null;
  serialNumber?: string | null;
  tenant?: string | null;
  medium?: string | null;
  levelType?: string | null;
  loadType?: string | null;
  endUserAreaType?: string | null;
  sortedField?: string | null;
  sortDirection?: string | null;
}): Promise<TableData> => {
  return new Promise<TableData>((resolve, reject) => {
    const queryParams = new URLSearchParams({
      page: page?.toString() || '',
      size: size?.toString() || '',
      clientId: clientId || '',
      locationUuid: locationUuid || '',
      groupUuid: groupUuid || '',
      locationName: locationName || '',
      groupName: groupName || '',
      measurementName: measurementName || '',
      serialNumber: serialNumber || '',
      tenant: tenant || '',
      medium: medium || '',
      levelType: levelType || '',
      loadType: loadType || '',
      endUserAreaType: endUserAreaType || '',
      sortedField: sortedField || '',
      sortDirection: sortDirection || '',
    });

    initHttpClient(BASE_URL)
      .httpClient.get<TableData>(
        API_URLS.getDashboardTableData({ queryParams: queryParams.toString() })
      )
      .then((response) => {
        // console.log(response.data);
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
