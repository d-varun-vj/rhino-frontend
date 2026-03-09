export const LOCAL_STORAGE_KEYS = {
  PERIODIC_ALARM: {
    CREATE_MEASUREMENTS: 'periodic-alarm-measurements:create',
    LIST_FILTERS: 'periodic-alarm-list-filters',
    updateMeasurements: (uuid: string) =>
      `periodic-alarm-measurements:update:${uuid}`,
  },
} as const;
