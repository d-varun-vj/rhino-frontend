import { format } from 'date-fns';
import { convertToLocalTime } from './convert-to-localtime';

export const formatLocalDateTime = (timestamp: string) => {
  return format(convertToLocalTime(timestamp), 'dd-MM-yyyy HH:mm');
};
