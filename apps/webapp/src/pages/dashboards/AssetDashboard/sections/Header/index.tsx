import CustomBreadcrumbs, {
  BreadcrumbsItem,
} from 'apps/webapp/src/components/common/Breadcrumbs';
import DateRangeWithTimePickerField from 'apps/webapp/src/components/common/datetime/DateRangeWithTimePickerField';
import PageTitle from 'apps/webapp/src/components/typography/PageTitle';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { useTranslation } from 'react-i18next';
import { FaHome } from 'react-icons/fa';
import { useSelectedDateRange } from '../../context/selectedDateRange';

const Header = () => {
  const { clients } = useUserFilter();
  const { t } = useTranslation('assetDashboard');
  const { dateRange: selectedDateRange, setDateRange: onSelectDate } =
    useSelectedDateRange();

  const isClientSelected = !!(clients && clients.length > 0);

  const breadcrumbsItems: BreadcrumbsItem[] = [
    {
      key: 'home',
      icon: FaHome,
      disabled: false,
    },
    {
      key: 'portfolio',
      title: isClientSelected ? clients[0].name : t('breadCrumbs.client'),
      disabled: !isClientSelected,
    },
    {
      key: 'asset',
      title: t('breadCrumbs.localisation'),
    },
    {
      key: 'group',
      title: t('breadCrumbs.group'),
    },
    {
      key: 'measurement',
      title: t('breadCrumbs.measurement'),
    },
  ];

  return (
    <header className="pt-4 px-2 shadow-[0_4px_2px_-2px_rgba(0,0,0,0.05)] rounded mb-5">
      <div className="flex justify-between items-center">
        <div>
          <CustomBreadcrumbs
            items={breadcrumbsItems}
            separatorMargin={'sm'}
            onItemClick={(key) => {
              console.log(key);
            }}
          />
          <PageTitle title={t('mainHeader.portfolio')} className="!mb-0" />
        </div>
        <div className="w-80">
          <DateRangeWithTimePickerField
            onChange={(val) => {
              onSelectDate(val);
            }}
            size="xs"
            placeholder={t('datePicker.chooseDate', { ns: 'components' })}
            initialValue={selectedDateRange}
            alignRight
            withIcon
            height="44px"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
