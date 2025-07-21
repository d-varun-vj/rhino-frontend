import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import {
  canViewItem,
  getToNavLink,
  resolveMenuLink,
} from 'apps/webapp/src/helpers/sidebar';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { MenuItemType, MenuKeys } from '../config';
import MinimizePopup from '../MinimizePopup';
import './MenuItem.css';

export type MenuItemProps = {
  menuItem: MenuItemType;
  minimize: {
    isMinimize: boolean;
    item: MenuKeys | '';
    setItem: Dispatch<
      SetStateAction<{
        isMinimize: boolean;
        item: MenuKeys | '';
      }>
    >;
  };
};

const MenuItem = ({ menuItem, minimize }: MenuItemProps) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { client, location, group } = useUserFilter();

  return (
    <li
      className=""
      key={menuItem.key}
      onMouseEnter={() =>
        minimize.setItem({
          isMinimize: minimize.isMinimize,
          item: menuItem.key,
        })
      }
    >
      <NavLink
        to={resolveMenuLink(menuItem)}
        target={`${menuItem.link ? '_blank' : ''}`}
        className={`nav-menu-a  ${minimize.isMinimize ? '!px-0 !text-center !flex !items-center !justify-center py-[12px]' : ''}`}
      >
        {({ isActive }) => (
          <>
            <i className={`${isActive ? 'nav-active' : ''}`}>
              <menuItem.icon />
            </i>
            {!minimize.isMinimize && (
              <span className={`${isActive ? 'nav-active' : ''}`}>
                {t(menuItem.label)}
              </span>
            )}
          </>
        )}
      </NavLink>

      {/* Sub Menu Item */}
      {!minimize.isMinimize && (
        <ul className="m-0 p-0 py-[10px] nav-sub-menu">
          {menuItem.subItems?.map((subItem) =>
            user && canViewItem({ subItem, user }) ? (
              <NavLink
                to={getToNavLink({ subItem, client, location, group })}
                key={subItem.key}
              >
                {({ isActive }) => {
                  return (
                    <li className="relative">
                      <p
                        className={`${
                          isActive
                            ? 'nav-active nav-sub-menu-a'
                            : minimize.isMinimize
                              ? 'hover:!bg-rhino-indigo-blue nav-sub-menu-a'
                              : 'nav-sub-menu-a'
                        }`}
                      >
                        <i className={`${isActive ? 'nav-active' : ''}`}>
                          <subItem.icon className="text-[15px]" />
                        </i>
                        <span className={`${isActive ? 'nav-active' : ''}`}>
                          {t(subItem.label)}
                        </span>
                      </p>
                    </li>
                  );
                }}
              </NavLink>
            ) : null
          )}
        </ul>
      )}
      {minimize.isMinimize && minimize.item === menuItem.key && (
        <MinimizePopup menuItem={menuItem} />
      )}
    </li>
  );
};

export default MenuItem;
