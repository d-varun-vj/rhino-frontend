import { AssetDashboardCardRes } from '@rhino/apis';
import { useFeatureFlags } from 'apps/webapp/src/context/featureFlag';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import {
  MEDIUM_ICONS,
  MEDIUM_TW_COLORS,
  T_MEDIUM_LABELS,
} from '../../../config';

const ConsumptionCard = ({
  medium,
  currentTotal,
  percentageChange,
  unit,
}: AssetDashboardCardRes) => {
  const { t } = useTranslation('assetDashboard');
  const { features } = useFeatureFlags();

  const MediumIcon = MEDIUM_ICONS[medium];
  const hasPercentageChange = Number.isFinite(percentageChange);
  const isPositivePercentageChange =
    hasPercentageChange && percentageChange > 0;
  const isNegativePercentageChange =
    hasPercentageChange && percentageChange < 0;
  const showPercentageChangeIcon =
    isPositivePercentageChange || isNegativePercentageChange;
  const PercentageChangeIcon = isPositivePercentageChange
    ? FaArrowUp
    : FaArrowDown;

  const mediumColor = MEDIUM_TW_COLORS[medium];
  const percentageChangeColor = isNegativePercentageChange
    ? 'text-rhino-energy-green'
    : isPositivePercentageChange
      ? 'text-red-500'
      : 'text-black';
  const isPercentageChangeEnabled =
    !!features?.ENABLE_ASSET_DASHBOARD_PERCENTAGE_CHANGE;
  const formattedPercentageChange = isPositivePercentageChange
    ? `+${percentageChange}%`
    : `${percentageChange}%`;

  const formatNumberWithSpaces = (value: number) =>
    value
      .toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      })
      .replace(/,/g, ' ');

  return (
    <div className="shadow-sm rounded-[14px] bg-white p-4 border border-gray-100">
      <div className="flex justify-between items-center p-1 w-full">
        <div className="flex justify-center items-center gap-1">
          <MediumIcon className={`w-8 h-8 ${mediumColor}`} />
          <span className={`text-xl ${mediumColor}`}>
            {t(T_MEDIUM_LABELS[medium])}
          </span>
        </div>
        <button className="cursor-pointer">
          <MdOutlineKeyboardArrowDown className={`w-8 h-8 ${mediumColor}`} />
        </button>
      </div>
      <div className="w-full flex justify-center items-center py-5">
        <div className="flex gap-2 items-baseline">
          <span className={`text-4xl ${mediumColor}`}>
            {formatNumberWithSpaces(currentTotal)}
          </span>
          <span className={`text-lg ${mediumColor}`}>{unit}</span>
        </div>
      </div>
      {isPercentageChangeEnabled && (
        <div className="w-full h-5 flex justify-end items-center">
          {hasPercentageChange && (
            <div className="flex items-center gap-1">
              {showPercentageChangeIcon && (
                <PercentageChangeIcon
                  className={clsx('text-[14px]', percentageChangeColor)}
                />
              )}
              <span className={clsx('text-[14px]', percentageChangeColor)}>
                {formattedPercentageChange}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsumptionCard;
