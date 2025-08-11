import { TableMeta } from '@rhino/utils';
import { useQuery } from '@tanstack/react-query';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';
import { PeriodicAlarmExecution, PeriodicAlarmExecutionParam } from '../types';

export type PeriodicAlarmExecutionRes = {
  data: PeriodicAlarmExecution[];
  meta: TableMeta;
};

export const useGetExecutions = (params: PeriodicAlarmExecutionParam) => {
  const {
    page,
    size,
    sort,
    uuid,
    endDate,
    startDate,
    executionStatus,
    status,
  } = params;

  const queryParams = {
    ...(!!page && { page }),
    ...(!!size && { size }),
    ...((sort.field || sort.direction) && {
      sort:
        sort.field && sort.direction
          ? `${sort.field},${sort.direction}`
          : sort.field || sort.direction,
    }),
    ...(!!startDate &&
      !!endDate && {
        ...{ startDate },
        ...{ endDate },
      }),
    ...(!!executionStatus && { executionStatus }),
    ...(!!status && { status }),
  };

  return useQuery({
    queryKey: [queryParams, uuid],
    queryFn: async () => {
      const response = await httpClient.get<PeriodicAlarmExecutionRes>(
        API_URLS.getExecutions(uuid),
        { params: queryParams }
      );
      return response.data;
    },
    enabled: !!uuid,
  });
};
