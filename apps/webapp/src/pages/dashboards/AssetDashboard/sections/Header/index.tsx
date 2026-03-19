import CustomBreadcrumbs, {
  BreadcrumbsItem,
} from 'apps/webapp/src/components/common/Breadcrumbs';
import PageTitle from 'apps/webapp/src/components/typography/PageTitle';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { useTranslation } from 'react-i18next';
import { FaHome } from 'react-icons/fa';

const Header = () => {
  const { clients } = useUserFilter();
  const { t } = useTranslation('assetDashboard');

  const breadcrumbsItems: BreadcrumbsItem[] = [
    {
      key: 'home',
      icon: FaHome,
      disabled: false,
    },
    {
      key: 'portfolio',
      title:
        clients && clients.length > 0
          ? clients[0].name
          : t('breadCrumbs.client'),
      disabled: !clients || clients.length === 0,
    },
    { key: 'asset', title: t('breadCrumbs.localisation') },
    { key: 'group', title: t('breadCrumbs.group') },
    {
      key: 'measurement',
      title: t('breadCrumbs.measurement'),
    },
  ];

  return (
    <header className="pt-4 px-2 shadow-[0_4px_2px_-2px_rgba(0,0,0,0.05)] rounded">
      <CustomBreadcrumbs
        items={breadcrumbsItems}
        separatorMargin={'sm'}
        onItemClick={(key) => {
          console.log(key);
        }}
      />
      <PageTitle title={t('mainHeader.portfolio')} className="!mb-0" />
    </header>
  );
};

export default Header;
