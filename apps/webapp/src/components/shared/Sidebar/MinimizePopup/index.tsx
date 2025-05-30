import { UserType } from '../../../../api/User/types';
import { MenuItemType } from '../config';
import { VscTriangleLeft } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/user';
import { NavLink } from 'react-router-dom';
import { canViewItem } from '../../../../helpers/sidebar';

const MinimizePopup = ({ menuItem }: { menuItem: MenuItemType }) => {
  const { t } = useTranslation();
  const { user } = useUser();

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
          user && canViewItem({ subItem, user }) ? (
            <NavLink
              to={subItem.wicketLink || subItem.route || '#'}
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
                    <span className={``}>{t(subItem.label)}</span>
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
