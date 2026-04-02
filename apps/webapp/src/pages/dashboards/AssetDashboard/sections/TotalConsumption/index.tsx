import { Grid } from '@mantine/core';
import {
  AssetDashboardGroupBy,
  AssetType,
  usePostTotalConsumptionCard,
} from '@rhino/apis';
import CustomLoader from 'apps/webapp/src/components/common/Loader';
import SubTitle from 'apps/webapp/src/components/typography/SubTitle';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelectedDateRange } from '../../context/selectedDateRange';
import { buildDateTime } from '../../helper';
import SectionWrapper from '../SectionWrapper';
import ConsumptionCard from './ConsumptionCard';

const TotalConsumption = () => {
  const { t } = useTranslation('assetDashboard');
  const { clients, locations, groups } = useUserFilter();
  const { dateRange } = useSelectedDateRange();

  const {
    mutate: postTotalConsumptionCard,
    data: totalConsumptionData,
    isPending,
    isError,
  } = usePostTotalConsumptionCard();

  const asset = useMemo(() => {
    const groupUuids = groups?.map(({ uuid }) => uuid).filter(Boolean) ?? [];
    const locationUuids =
      locations?.map(({ uuid }) => uuid).filter(Boolean) ?? [];
    const clientUuids = clients?.map(({ uuid }) => uuid).filter(Boolean) ?? [];

    if (groupUuids.length) {
      return { assetType: AssetType.GROUP, uuids: groupUuids };
    }

    if (locationUuids.length) {
      return { assetType: AssetType.LOCATION, uuids: locationUuids };
    }

    return { assetType: AssetType.CLIENT, uuids: clientUuids };
  }, [clients, groups, locations]);

  useEffect(() => {
    if (!dateRange?.startDate || !dateRange?.endDate || !clients?.length) {
      return;
    }

    const from = buildDateTime(dateRange.startDate, dateRange.startTime);
    const to = buildDateTime(dateRange.endDate, dateRange.endTime);

    if (!from || !to) return;

    postTotalConsumptionCard({
      filter: {
        media: [],
        from,
        to,
        asset,
      },
      groupBy: [AssetDashboardGroupBy.MEDIUM, AssetDashboardGroupBy.CLIENT],
    });
  }, [asset, clients, dateRange, postTotalConsumptionCard]);

  if (isPending) {
    return <CustomLoader type="bars" />;
  }

  if (totalConsumptionData?.length === 0) {
    return <SubTitle content={t('common.noData')} className="ml-5 mt-10" />;
  }

  if (isError) {
    return (
      <SubTitle
        content={t('internalServerError', { ns: 'common' })}
        className="ml-5 mt-10"
      />
    );
  }

  return (
    <SectionWrapper title={t('totalConsumptionCard')} id="total-consumption">
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

export default TotalConsumption;
