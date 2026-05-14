import { UserViewPermission, ViewPermissionsType } from '@rhino/apis';
import SubTitle from 'apps/webapp/src/components/typography/SubTitle';
import { useFeatureFlags } from 'apps/webapp/src/context/featureFlag';
import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { shouldSetInitialClient } from 'apps/webapp/src/helpers/client';
import MainLayout from 'apps/webapp/src/layouts/MainLayout';
import AccessAuthorizer from 'apps/webapp/src/wrappers/AccessAuthorizer';
import { useTranslation } from 'react-i18next';
import { ripponOptions } from './config';
import { useSelectedDateRange } from './context/selectedDateRange';
import ConsumptionTable from './sections/ConsumptionTable';
import Header from './sections/Header';
import TotalConsumptionCards from './sections/TotalConsumptionCards';

const AssetDashboard = () => {
  const { features } = useFeatureFlags();
  const { t } = useTranslation('assetDashboard');
  const { clients } = useUserFilter();
  const { user } = useUser();
  const { dateRange } = useSelectedDateRange();
  const isClientSelected = !!(clients && clients.length > 0);
  const isDateSelected = !!(
    dateRange &&
    dateRange?.startDate &&
    dateRange?.endDate
  );
  const isRequiredFieldEmpty = !isClientSelected || !isDateSelected;
  const shouldShowClientLabel = user && !shouldSetInitialClient(user);

  const hasMultiselectorEnabled: boolean =
    features?.ENABLE_DASHBOARD_MULTISELECTOR ?? false;

  const requiredFieldEmptyText = shouldShowClientLabel
    ? t('common.selectState.withClient')
    : t('common.selectState.withoutClient');

  return (
    <AccessAuthorizer
      viewPermissionType={ViewPermissionsType.ViewRoleBased}
      viewPermissions={[UserViewPermission.ASSET_DASHBOARD_ROLE]}
    >
      <MainLayout
        title={t('mainHeader.asset')}
        topRibbonOptions={ripponOptions({
          hasMultiselectorEnabled,
        })}
        pageOptions={{
          featureFlag: 'ENABLE_ASSET_DASHBOARD',
        }}
      >
        <div className="relative min-h-screen">
          <Header />
          {isRequiredFieldEmpty ? (
            <SubTitle content={requiredFieldEmptyText} className="ml-5 mt-10" />
          ) : (
            <>
              <TotalConsumptionCards />
              <ConsumptionTable />
            </>
          )}
        </div>
      </MainLayout>
    </AccessAuthorizer>
  );
};

export default AssetDashboard;
