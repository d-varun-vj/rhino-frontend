import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MENU_KEYS, MenuItemType, SubItemType } from '../config';
import './MenuItem.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/useUser';
import { UserType, ViewPermissionsType } from '../../../../api/User/types';
import MinimizePopup from '../MinimizePopup';

export type menuItem = {
  menuItem: MenuItemType;
  minimize: {
    isMinimize: boolean;
    item: MENU_KEYS | '';
    setItem: Dispatch<
      SetStateAction<{
        isMinimize: boolean;
        item: MENU_KEYS | '';
      }>
    >;
  };
};

export type ItemType = {
  subItem: SubItemType;
  isMinimize?: boolean;
};

const MenuItem = ({ menuItem, minimize }: menuItem) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(t(menuItem.label));
  const location = useLocation();
  const { user } = useUser();
  const Item = ({ subItem, isMinimize = false }: ItemType) => (
    <NavLink to={subItem.wicketLink || subItem.route || '#'}>
      {({ isActive }) => (
        <li className="relative">
          <p
            className={`${
              isActive
                ? 'nav-active nav-sub-menu-a'
                : isMinimize
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
  );

  useEffect(() => {
    document.title = title;
    menuItem.subItems?.map((item) => {
      if (item.route === location.pathname) {
        setTitle(t(item.label));
        return;
      }
    });
  }, [title, location.pathname, menuItem.key, menuItem.subItems, t]);

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
        to={`${menuItem.link ? menuItem.link : menuItem.subItems ? menuItem.subItems[0].route : '#'}`}
        target={`${menuItem.link ? 'blank' : ''}`}
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
          {menuItem.subItems?.map((subItem) => {
            if (user?.userType === UserType.SuperAdmin) {
              return <Item subItem={subItem} key={subItem.key} />;
            }
            return subItem.viewPermissionType ===
              ViewPermissionsType.UserTypeBased &&
              subItem.allowedUserTypes?.some((uType) => {
                if (uType === user?.userType) {
                  return true;
                }
              }) ? (
              <Item subItem={subItem} />
            ) : subItem.viewPermissionType ===
                ViewPermissionsType.ViewRoleBased &&
              subItem.viewPermissions?.some((permission) => {
                return user?.permissions?.some((userPermission) => {
                  if (userPermission === permission) {
                    return true;
                  }
                });
              }) ? (
              <Item subItem={subItem} />
            ) : null;
          })}
        </ul>
      )}
      {minimize.isMinimize && minimize.item === menuItem.key && (
        <MinimizePopup menuItem={menuItem} Item={Item} />
      )}
    </li>
  );
};

export default MenuItem;
