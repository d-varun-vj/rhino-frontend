import UserDropDown from './UserDropDown';
import ClientCombobox from '../Comboboxes/ClientCombobox';
import LocationCombobox from '../Comboboxes/LocationCombobox';
import GroupCombobox from '../Comboboxes/GroupCombobox';
import { useTranslation } from 'react-i18next';
import FavoriteMeter from './FavoriteMeter';

const Label = ({ label }: { label: string }) => (
  <div className="text-[.9rem] font-bold text-[#91A0B1] mr-[1rem]">{label}</div>
);

const TopRibbon = () => {
  const { t } = useTranslation();
  return (
    <header className="flex basis-auto h-auto relative z-40 justify-between">
      <div className="mt-[1rem] relative px-[.75rem] ">
        <div className="flex flex-row ">
          <div className="pl-[1rem] mt-[.25rem] items-baseline flex flex-row flex-wrap gap-10">
            <div className="flex items-center">
              <Label label={t('topRibbon.client')} />
              <ClientCombobox />
            </div>
            <div className="flex items-center">
              <Label label={t('topRibbon.location')} />
              <LocationCombobox />
            </div>
            <div className="flex items-center">
              <Label label={t('topRibbon.group')} />
              <GroupCombobox />
            </div>
            <div className="flex items-center">
              <Label label={t('topRibbon.favoriteMeters')} />
              <FavoriteMeter />
            </div>
          </div>
        </div>
      </div>

      {/* User Drop down */}
      <UserDropDown />
    </header>
  );
};

export default TopRibbon;
