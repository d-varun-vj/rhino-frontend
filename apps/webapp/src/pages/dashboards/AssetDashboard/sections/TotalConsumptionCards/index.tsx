import { Grid } from '@mantine/core';
import {
  AssetDashboardGroupBy,
  usePostTotalConsumptionCard,
} from '@rhino/apis';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAssetDashboardQueryParams } from '../../hooks';
import useDataStateFeedback from '../../hooks/useDataStateFeedback';
import SectionWrapper from '../SectionWrapper';
import ConsumptionCard from './ConsumptionCard';

const TotalConsumptionCards = () => {
  const { t } = useTranslation('assetDashboard');
  const { asset, from, to, isReady } = useAssetDashboardQueryParams();

  const {
    mutate: postTotalConsumptionCard,
    data: totalConsumptionData,
    isPending,
    isError,
  } = usePostTotalConsumptionCard();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    postTotalConsumptionCard({
      filter: {
        media: [],
        from,
        to,
        asset,
      },
      groupBy: [AssetDashboardGroupBy.MEDIUM, AssetDashboardGroupBy.CLIENT],
    });
  }, [asset, from, isReady, postTotalConsumptionCard, to]);

  const dataStateView = useDataStateFeedback({
    isPending,
    isError,
    isEmpty: totalConsumptionData?.length === 0,
    errorMessage: t('internalServerError', { ns: 'common' }),
    emptyMessage: t('common.noData'),
  });

  if (dataStateView) {
    return dataStateView;
  }

  return (
    <SectionWrapper
      title={t('totalConsumptionCard')}
      id="total-consumption-cards"
    >
      <Grid gutter="xl">
        {totalConsumptionData?.map((item) => (
          <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 4 }} key={item.medium}>
            <ConsumptionCard {...item} />
          </Grid.Col>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default TotalConsumptionCards;
