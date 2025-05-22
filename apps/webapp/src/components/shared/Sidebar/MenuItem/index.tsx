import { Dispatch, SetStateAction } from 'react';
import { MenuKeys, MenuItemType, SubItemType } from '../config';
import './MenuItem.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/useUser';
import {
  User,
  UserType,
  ViewPermissionsType,
} from '../../../../api/User/types';
import MinimizePopup from '../MinimizePopup';

export type menuItem = {
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

const hasUserTypeAccess = ({
  subItem,
  user,
}: {
  subItem: SubItemType;
  user: User;
}) => {
  return (
    subItem.viewPermissionType === ViewPermissionsType.UserTypeBased &&
    subItem.allowedUserTypes?.includes(user?.userType)
  );
};

const hasRoleAccess = ({
  subItem,
  user,
}: {
  subItem: SubItemType;
  user: User | null;
}) => {
  return (
    subItem.viewPermissionType === ViewPermissionsType.ViewRoleBased &&
    subItem.viewPermissions?.some((permission) =>
      user?.permissions?.includes(permission)
    )
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const canViewItem = ({
  subItem,
  user,
}: {
  subItem: SubItemType;
  user: User;
}) => {
  return (
    user?.userType === UserType.SuperAdmin ||
    hasUserTypeAccess({ subItem, user }) ||
    hasRoleAccess({ subItem, user })
  );
};

const MenuItem = ({ menuItem, minimize }: menuItem) => {
  const { t } = useTranslation();
  const { user } = useUser();

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
        to={`${menuItem.link ? menuItem.link : menuItem.subItems ? (menuItem.subItems[0].route ? menuItem.subItems[0].route : menuItem.subItems[0].wicketLink) : '#'}`}
        target={`${menuItem.link && 'blank'}`}
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
                to={subItem.wicketLink || subItem.route || '#'}
                key={subItem.key}
              >
                {({ isActive }) => (
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
                )}
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
