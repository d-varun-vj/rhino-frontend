import API_URLS, { BASE_URL } from '../../../api/endpoints';
import { initHttpClient } from '../../../api/httpClient';
import { DashboardType } from '../types';

type TableData = {
  results: DashboardType[];
  totalCount: number;
  countPerPage: number;
};

export const getTableData = ({
  page,
  size,
  clientId,
  locationUuid,
  groupUuid,
}: {
  page?: number | null;
  size?: number | null;
  clientId?: string | null;
  locationUuid?: string | null;
  groupUuid?: string | null;
}): Promise<TableData> => {
  return new Promise<TableData>((resolve) => {
    const queryParams = new URLSearchParams({
      page: page?.toString() || '',
      size: size?.toString() || '',
      clientId: clientId || '',
      locationUuid: locationUuid || '',
      groupUuid: groupUuid || '',
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
        // reject(error.response?.data || error);
      });
  });
};
