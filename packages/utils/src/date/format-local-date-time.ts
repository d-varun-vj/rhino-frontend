import { format } from 'date-fns';
import { convertToLocalTime } from './convert-to-localtime';

export const formatLocalDateTime = (timestamp: string, _format?: string) => {
  return format(convertToLocalTime(timestamp), _format ?? 'dd-MM-yyyy HH:mm');
};

export const formatDateTime = (timestamp: string, _format?: string) => {
  return format(timestamp, _format ?? 'dd-MM-yyyy HH:mm');
};
