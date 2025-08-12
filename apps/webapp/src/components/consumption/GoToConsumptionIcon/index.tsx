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

  shouldCompareMeasurements?: boolean;
}

export default function GoToConsumptionIcon({
  measurementUuid: uuid,
  incremental,
  shouldCompareMeasurements = true,
  type,
}: GoToConsumptionIconProps) {
  const { client, location, group } = useUserFilter();
  const { t } = useTranslation('components');
  const translationBaseRoute = 'goToConsumptionIcon';

  return (
    <IconButton
      action={() => {
        window.location.href =
          VITE_WICKET_BASE_URL +
          'consumptionChart' +
          getRibbonParams({ client, location, group }) +
          `&uuid=${uuid}&incremental=${incremental}&type=${type}&shouldCompareMeasurement=${shouldCompareMeasurements}`;
      }}
      popupContent={t(translationBaseRoute + 'popup')}
      dataTestId="consumption-chart-btn"
    >
      <FaChartLine />
    </IconButton>
  );
}
