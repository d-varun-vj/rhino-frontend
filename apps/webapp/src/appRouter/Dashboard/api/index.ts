import API_URLS, { BASE_URL } from '../../../api/endpoints';
import { initHttpClient } from '../../../api/httpClient';
import { VITE_WICKET_BASE_URL } from '../../../components/shared/Sidebar/data';
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
  locationName,
}: {
  page?: number | null;
  size?: number | null;
  clientId?: string | null;
  locationUuid?: string | null;
  groupUuid?: string | null;
  locationName?: string | null;
}): Promise<TableData> => {
  return new Promise<TableData>((resolve, reject) => {
    const queryParams = new URLSearchParams({
      page: page?.toString() || '',
      size: size?.toString() || '',
      clientId: clientId || '',
      locationUuid: locationUuid || '',
      groupUuid: groupUuid || '',
      locationName: locationName || '',
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
