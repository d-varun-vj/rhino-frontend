import { AssetType } from '@rhino/apis';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { useMemo } from 'react';
import { useSelectedDateRange } from '../context/selectedDateRange';
import { buildDateTime } from '../helper/index';

export const useAssetDashboardQueryParams = () => {
  const { clients, locations, groups } = useUserFilter();
  const { dateRange } = useSelectedDateRange();

  const asset = useMemo(() => {
    const groupUuids = groups?.map(({ uuid }) => uuid).filter(Boolean) ?? [];
    if (groupUuids.length) {
      return { assetType: AssetType.GROUP, uuids: groupUuids };
    }

    const locationUuids =
      locations?.map(({ uuid }) => uuid).filter(Boolean) ?? [];
    if (locationUuids.length) {
      return { assetType: AssetType.LOCATION, uuids: locationUuids };
    }

    const clientUuids = clients?.map(({ uuid }) => uuid).filter(Boolean) ?? [];
    return { assetType: AssetType.CLIENT, uuids: clientUuids };
  }, [clients, groups, locations]);

  const from = useMemo(
    () => buildDateTime(dateRange?.startDate, dateRange?.startTime),
    [dateRange?.startDate, dateRange?.startTime]
  );

  const to = useMemo(
    () => buildDateTime(dateRange?.endDate, dateRange?.endTime),
    [dateRange?.endDate, dateRange?.endTime]
  );

  const isReady = Boolean(
    dateRange?.startDate && dateRange?.endDate && clients?.length && from && to
  );

  return { asset, from, to, isReady };
};
