import UserDropDown from './UserDropDown';
import ClientCombobox from '../Comboboxes/ClientCombobox';
import LocationCombobox from '../Comboboxes/LocationCombobox';
import GroupCombobox from '../Comboboxes/GroupCombobox';
import { useTranslation } from 'react-i18next';
import FavoriteMeter from './FavoriteMeter';

const TopRibbon = () => {
  const { t } = useTranslation();
  const Items: { labelKey: string; component: JSX.Element }[] = [
    {
      labelKey: 'topRibbon.client', // from i18n
      component: <ClientCombobox />,
    },
    {
      labelKey: 'topRibbon.location',
      component: <LocationCombobox />,
    },
    {
      labelKey: 'topRibbon.group',
      component: <GroupCombobox />,
    },
    {
      labelKey: 'topRibbon.favoriteMeters',
      component: <FavoriteMeter />,
    },
  ];

  return (
    <header className="flex basis-auto h-auto  z-30 justify-between max-sm:flex-col">
      <div className="mt-[1rem]  px-[.75rem] ">
        <div className="flex flex-row ">
          <div className="pl-[1rem] mt-[.25rem] items-baseline flex flex-row flex-wrap gap-10 ">
            {Items.map((item) => (
              <div
                className="flex items-center max-md:justify-between max-md:w-full"
                key={item.labelKey}
              >
                <div className="text-[.9rem] font-bold text-[#91A0B1] mr-[1rem]">
                  {t(item.labelKey)}
                </div>
                {item.component}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* User Profile */}
      <UserDropDown />
    </header>
  );
};

export default TopRibbon;
