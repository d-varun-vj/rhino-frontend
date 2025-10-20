import { DatePickerPreset } from '@mantine/dates';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';

export const getCurrentDateAsString = (format: string): string => {
  return dayjs().format(format);
};

export const getDateRangePresets = ({
  t,
}: {
  t: TFunction;
}): DatePickerPreset<'range'>[] | undefined => {
  const today = dayjs();

  return [
    {
      value: [
        today.format('YYYY-MM-DD'),
        today.add(1, 'day').format('YYYY-MM-DD'),
      ],
      label: t('datePicker.presets.today'),
    },
    {
      value: [
        today.subtract(1, 'day').format('YYYY-MM-DD'),
        today.format('YYYY-MM-DD'),
      ],
      label: t('datePicker.presets.yesterday'),
    },
    {
      value: [
        today.subtract(7, 'day').format('YYYY-MM-DD'),
        today.format('YYYY-MM-DD'),
      ],
      label: t('datePicker.presets.last7Days'),
    },
    {
      value: [
        today.subtract(30, 'day').format('YYYY-MM-DD'),
        today.format('YYYY-MM-DD'),
      ],
      label: t('datePicker.presets.last30Days'),
    },
    {
      value: [
        today.startOf('month').format('YYYY-MM-DD'),
        today.format('YYYY-MM-DD'),
      ],
      label: t('datePicker.presets.thisMonth'),
    },
    {
      value: [
        today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
        today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
      ],
      label: t('datePicker.presets.lastMonth'),
    },
  ];
};
