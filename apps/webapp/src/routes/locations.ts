export const locations = {
  // Common
  base: '/v1',
  notAllowed: '/not-allowed',
  notFound: '*',
  serverError: '/500', // Used in apis/httpClient; change both if one is modified.

  // Pages
  dashboard: '/dashboard',
  consumption: '/consumption',
  alarm: {
    periodic: {
      base: '/alarm/periodic',
      create: '/alarm/periodic/create',
    },
  },
};
