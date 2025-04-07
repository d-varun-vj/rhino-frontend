import API_URLS from '../../../api/endpoints';
import { httpClient } from '../../../api/httpClient';
import { VITE_WICKET_BASE_URL } from '../../../components/shared/Sidebar/data';
import { DashboardType, DictionaryDto, Filter, Sort } from '../types';

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

export const getTableData = ({
  page,
  size,
  clientId,
  locationUuid,
  groupUuid,
  measurementUuids,
  filters,
  sort,
}: {
  page?: number | null;
  size?: number | null;
  clientId?: string | null;
  locationUuid?: string | null;
  groupUuid?: string | null;
  sort?: Sort | null;
  measurementUuids?: string[] | [];
  filters?: Filter | null;
}): Promise<TableData> => {
  return new Promise<TableData>((resolve, reject) => {
    const queryParams = new URLSearchParams({
      page: page?.toString() || '',
      size: size?.toString() || '',
      clientId: clientId || '',
      locationUuid: locationUuid || '',
      groupUuid: groupUuid || '',
      locationName: filters?.locationName || '',
      groupName: filters?.groupName || '',
      measurementName: filters?.measurementName || '',
      serialNumber: filters?.serialNumber || '',
      tenant: filters?.tenant || '',
      medium: filters?.medium || '',
      levelType: filters?.levelType || '',
      loadType: filters?.loadType || '',
      endUserAreaType: filters?.endUserAreaType || '',
      sortedField: sort?.field || '',
      sortDirection: sort?.direction || '',
    });

    httpClient
      .post<TableData>(
        API_URLS.getDashboardTableData({ queryParams: queryParams.toString() }),
        measurementUuids
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

export const getOptions = () => {
  return new Promise<Options>((resolve, reject) => {
    httpClient
      .get<Options>(API_URLS.getDashboardTableDataOptions())
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-promise-reject-errors
        reject(error.response?.data);
      });
  });
};
