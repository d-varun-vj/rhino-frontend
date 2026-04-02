export const buildDateTime = (
  date: string | null | undefined,
  time: string | null | undefined
) => {
  if (!date) return '';

  if (!time || !time.trim()) return `${date}T00:00:00`;

  const normalizedTime =
    time.length === 5 ? `${time}:00` : time.length === 8 ? time : '00:00:00';

  return `${date}T${normalizedTime}`;
};

export const isValidTime = (time: string | null) => {
  if (!time) return true;
  return /^\d{2}:\d{2}(:\d{2})?$/.test(time);
};

export const normalizeTime = (time: string | null) => {
  if (!time) return '00:00';
  return time.slice(0, 5);
};
