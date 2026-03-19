export const paths = {
  // Common
  base: '/v1',
  notAllowed: '/not-allowed',
  notFound: '*',
  serverError: '/500',

  // Pages.
  dashboards: {
    dashboard: '/dashboard',
    asset: '/asset-dashboard',
  },
  consumption: '/consumption',
  alarm: {
    periodic: {
      base: '/alarm/periodic',
      create: '/alarm/periodic/create',
      update: '/alarm/periodic/update/:uuid',
    },
  },
};
