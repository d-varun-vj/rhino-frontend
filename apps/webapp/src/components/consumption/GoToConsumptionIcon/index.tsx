import { VITE_WICKET_BASE_URL } from '@rhino/apis';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import { useTranslation } from 'react-i18next';
import { FaChartLine } from 'react-icons/fa';
import IconButton from '../../common/buttons/IconButton';

interface GoToConsumptionIconProps {
  measurementUuid: string;
  incremental: boolean | null;
  type: string | null;

  iconSize?: 'sm';
  openInNewTab?: boolean;
  shouldCompareMeasurements?: boolean;
}

export default function GoToConsumptionIcon({
  measurementUuid: uuid,
  incremental,
  type,
  iconSize,
  shouldCompareMeasurements = true,
  openInNewTab = false,
}: GoToConsumptionIconProps) {
  const { client, location, group } = useUserFilter();
  const { t } = useTranslation('components');

  return (
    <IconButton
      action={() => {
        const url =
          VITE_WICKET_BASE_URL +
          'consumptionChart' +
          getRibbonParams({ client, location, group }) +
          `&uuid=${uuid}&incremental=${incremental}&type=${type}&shouldCompareMeasurement=${shouldCompareMeasurements}`;

        if (openInNewTab) {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }}
      popupContent={t('consumption.goToConsumptionIcon.popup')}
      dataTestId="consumption-chart-btn"
      size={iconSize}
    >
      <FaChartLine />
    </IconButton>
  );
}
