import { Namespace, TFunction } from 'i18next';

export const getTranslationOptions = <T extends Namespace>({
  t,
}: {
  t: TFunction<T, undefined>;
}): Record<'MEASUREMENT_TYPE', { label: string; value: string }[]> => {
  return {
    MEASUREMENT_TYPE: [
      {
        label: t('measurement.common.measurementTypes.AUTOMATIC'),
        value: 'AUTOMATIC',
      },
      {
        label: t('measurement.common.measurementTypes.MANUAL'),
        value: 'MANUAL',
      },
      {
        label: t('measurement.common.measurementTypes.VIRTUAL'),
        value: 'VIRTUAL',
      },
    ],
  };
};
