import { UserType } from '@rhino/apis';
import { useFeatureFlags } from 'apps/webapp/src/context/featureFlag';
import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { canViewItem, getToNavLink } from 'apps/webapp/src/helpers/sidebar';
import { useTranslation } from 'react-i18next';
import { VscTriangleLeft } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';
import { SideBarOptions } from '..';
import { MenuItemType } from '../config';

const MinimizePopup = ({
  menuItem,
  sideBarOptions,
}: {
  menuItem: MenuItemType;
  sideBarOptions?: SideBarOptions;
}) => {
  const { t } = useTranslation('layout');
  const { features } = useFeatureFlags();
  const { user } = useUser();
  const { clients, locations, groups } = useUserFilter();

  return (
    <div className="min-w-[300px] absolute left-[75px]  z-40 -mt-10 ">
      {/* Header */}
      <div className="flex items-center">
        <VscTriangleLeft className="text-rhino-indigo-blue-light " />
        <a
          href={`${menuItem.link ? menuItem.link : '#'}`}
          target={`${menuItem.link ? 'blank' : ''}`}
        >
          <div
            className={`py-3 text-rhino-white px-4 rounded-lg  bg-rhino-indigo-blue-light min-w-[200px] -ml-[5px] text-sm ${menuItem.subItems ? 'rounded-bl-none  rounded-br-none' : ''}`}
          >
            {t(menuItem.label)}
          </div>
        </a>
      </div>
      <div className="w-full bg-rhino-indigo-blue-light ml-[11px] rounded-lg rounded-tl-none overflow-hidden">
        {menuItem.subItems?.map((subItem) =>
          user && canViewItem({ subItem, user, features }) ? (
            <NavLink
              to={getToNavLink({
                subItem,
                clients,
                locations,
                groups,
              })}
              key={subItem.key}
            >
              {({ isActive }) => (
                <li className="relative">
                  <p
                    className={`${
                      isActive
                        ? 'nav-active nav-sub-menu-a'
                        : user?.userType === UserType.SuperAdmin
                          ? 'hover:!bg-rhino-indigo-blue nav-sub-menu-a'
                          : 'nav-sub-menu-a'
                    }`}
                  >
                    <i className={`${isActive ? 'nav-active' : ''}`}>
                      <subItem.icon className="text-[15px]" />
                    </i>
                    <span className={``}>
                      {t(subItem.label(sideBarOptions?.customLabel))}
                    </span>
                  </p>
                </li>
              )}
            </NavLink>
          ) : null
        )}
      </div>
    </div>
  );
};

export default MinimizePopup;
