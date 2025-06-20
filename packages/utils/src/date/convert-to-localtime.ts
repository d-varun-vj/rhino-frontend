export const convertToLocalTime = (timestamp: string) => {
  return new Date(timestamp + 'Z');
};
