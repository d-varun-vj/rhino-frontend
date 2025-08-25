export const locations = {
  // Common
  base: '/v1',
  notAllowed: '/not-allowed',
  notFound: '*',

  // Pages.
  dashboard: '/dashboard',
  consumption: '/consumption',
  alarm: {
    periodic: {
      base: '/alarm/periodic',
      create: '/alarm/periodic/create',
      update: '/alarm/periodic/update/:uuid',
    },
  },
};
