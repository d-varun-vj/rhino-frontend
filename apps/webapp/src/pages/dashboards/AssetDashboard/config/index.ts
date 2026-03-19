import { TopRibbonOptions } from 'apps/webapp/src/components/layout/TopRibbon';
import { MediumType } from '../types';

export const ripponOptions = (): TopRibbonOptions => {
  return {
    location: {
      disabled: true,
    },
    group: {
      disabled: true,
    },
    favoriteMeter: {
      hidden: true,
    },
  };
};

export const MEDIUM_COLORS: Record<MediumType, string> = {
  ELECTRICITY: 'var(--color-medium-electricity)',
  GAS: 'var(--color-medium-gas)',
  WATER: 'var(--color-medium-water)',
  HEAT: 'var(--color-medium-heat)',
  COOLING: 'var(--color-medium-cooling)',
  CO2: 'var(--color-medium-co2)',
};
