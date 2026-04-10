import CustomBreadcrumbs, {
  BreadcrumbsItem,
} from 'apps/webapp/src/components/common/Breadcrumbs';
import DateRangeWithTimePickerField from 'apps/webapp/src/components/common/datetime/DateRangeWithTimePickerField';
import PageTitle from 'apps/webapp/src/components/typography/PageTitle';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { FilterData } from 'apps/webapp/src/context/userFilter/user-filter-context';
import { useTranslation } from 'react-i18next';
import { FaHome } from 'react-icons/fa';
import { useSelectedDateRange } from '../../context/selectedDateRange';

const Header = () => {
  const { clients, locations, groups, setLocations, setGroups } =
    useUserFilter();
  const { t } = useTranslation('assetDashboard');
  const { dateRange: selectedDateRange, setDateRange: onSelectDate } =
    useSelectedDateRange();

  const isClientSelected = !!(clients && clients.length > 0);
  const isLocationSelected = !!(locations && locations.length > 0);
  const isGroupSelected = !!(groups && groups.length > 0);

  const resolveTitle = (data: FilterData[]) => {
    if (data.length <= 1) {
      return data[0].name;
    }

    return data[0].name + ` ...+${data.length - 1}`;
  };

  const breadcrumbsItems: BreadcrumbsItem[] = [
    {
      key: 'home',
      icon: FaHome,
      disabled: false,
    },
    {
      key: 'clients',
      title: isClientSelected ? clients[0].name : t('breadCrumbs.client'),
      disabled: !isClientSelected,
    },
    {
      key: 'locations',
      title: isLocationSelected
        ? resolveTitle(locations)
        : t('breadCrumbs.localisation'),
      disabled: !isLocationSelected,
      popoverData: locations?.map((loc) => loc.name),
    },
    {
      key: 'groups',
      title: isGroupSelected ? resolveTitle(groups) : t('breadCrumbs.group'),
      disabled: !isGroupSelected,
      popoverData: groups?.map((group) => group.name),
    },
    {
      key: 'measurements',
      title: t('breadCrumbs.measurement'),
    },
  ];

  const handleBreadcrumbsItemClick = (key: string) => {
    switch (key) {
      case 'home':
      case 'clients':
        setLocations([]);
        setGroups([]);
        break;
      case 'locations':
        setGroups([]);
        break;
      case 'groups':
        break;
      default:
        break;
    }
  };

  return (
    <header className="pt-4 px-2 shadow-[0_4px_2px_-2px_rgba(0,0,0,0.05)] rounded mb-5">
      <div className="flex justify-between items-center">
        <div>
          <CustomBreadcrumbs
            items={breadcrumbsItems}
            separatorMargin={'sm'}
            onItemClick={handleBreadcrumbsItemClick}
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
