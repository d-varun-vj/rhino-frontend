import { AssetDashboardMedium, AssetType } from '@rhino/apis';
import { TopRibbonOptions } from 'apps/webapp/src/components/layout/TopRibbon';
import { CiCloud, CiTempHigh } from 'react-icons/ci';
import { FiWind } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { TbBolt } from 'react-icons/tb';

export const ripponOptions = ({
  hasMultiselectorEnabled,
}: {
  hasMultiselectorEnabled: boolean;
}): TopRibbonOptions => {
  return {
    location: {
      multiple: hasMultiselectorEnabled,
    },
    group: {
      multiple: hasMultiselectorEnabled,
    },
    favoriteMeter: {
      hidden: true,
    },
  };
};

export const MEDIUM_COLORS: Record<AssetDashboardMedium, string> = {
  ELECTRICITY: 'var(--color-medium-electricity)',
  GAS: 'var(--color-medium-gas)',
  WATER: 'var(--color-medium-water)',
  HEAT: 'var(--color-medium-heat)',
  COOLING: 'var(--color-medium-cooling)',
  CO2: 'var(--color-medium-co2)',
};

export const MEDIUM_TW_COLORS: Record<AssetDashboardMedium, string> = {
  ELECTRICITY: 'text-medium-electricity',
  GAS: 'text-medium-gas',
  WATER: 'text-medium-water',
  HEAT: 'text-medium-heat',
  COOLING: 'text-medium-cooling',
  CO2: 'text-medium-co2',
};

export const MEDIUM_ICONS: Record<AssetDashboardMedium, IconType> = {
  ELECTRICITY: TbBolt,
  GAS: HiOutlineFire,
  WATER: MdOutlineWaterDrop,
  HEAT: CiTempHigh,
  COOLING: FiWind,
  CO2: CiCloud,
};

export const T_MEDIUM_LABELS: Record<AssetDashboardMedium, string> = {
  ELECTRICITY: 'common.mediums.electricity',
  GAS: 'common.mediums.gas',
  WATER: 'common.mediums.water',
  HEAT: 'common.mediums.heat',
  COOLING: 'common.mediums.cooling',
  CO2: 'common.mediums.co2',
};

export const T_ASSET_LABELS: Record<AssetType, string> = {
  CLIENT: 'common.assetTypes.client',
  LOCATION: 'common.assetTypes.location',
  GROUP: 'common.assetTypes.group',
  MEASUREMENT: 'common.assetTypes.measurement',
};

export const T_ASSET_SEARCH: Partial<Record<AssetType, string>> = {
  LOCATION: 'common.search.location',
  GROUP: 'common.search.group',
  MEASUREMENT: 'common.search.measurement',
};
