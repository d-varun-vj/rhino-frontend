import MainLayout from 'apps/webapp/src/layouts/MainLayout';
import { useTranslation } from 'react-i18next';
import { ripponOptions } from './config';
import Header from './sections/Header';

const AssetDashboard = () => {
  const { t } = useTranslation('assetDashboard');

  return (
    <MainLayout
      title={t('mainHeader.asset')}
      topRibbonOptions={ripponOptions()}
      pageOptions={{
        featureFlag: 'ENABLE_ASSET_DASHBOARD',
      }}
    >
      <Header />
    </MainLayout>
  );
};

export default AssetDashboard;
