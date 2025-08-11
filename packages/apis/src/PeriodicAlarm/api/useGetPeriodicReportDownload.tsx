import { useMutation } from '@tanstack/react-query';
import API_URLS from '../../endpoints';
import { httpClient } from '../../httpClient';

export const useDownloadPeriodicReportUrl = () => {
  return useMutation({
    mutationFn: async (uuid: string) => {
      const response = await httpClient.get<{ presignedUrl: string }>(
        API_URLS.getPeriodicReportDownloadUrl(uuid)
      );
      return response.data;
    },
  });
};
