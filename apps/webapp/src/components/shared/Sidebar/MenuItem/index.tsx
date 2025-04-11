import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MENU_KEYS, MenuItemType, SubItemType } from '../data';
import './MenuItem.css';
import { Link, Location, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/useUser';
import { UserType, UserViewPermissions } from '../../../../api/User/types';
import { TFunction } from 'i18next';
import MinimizePopup from '../MinimizePopup';

export type menuItem = {
  menuItem: MenuItemType;
  setActiveMenu: React.Dispatch<React.SetStateAction<MENU_KEYS>>;
  activeMenu: MENU_KEYS;
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
  t: TFunction<'translation', undefined>;
  key?: string;
  location: Location<string>;
  isMinimize?: boolean;
};

const Item = ({ subItem, t, key, location, isMinimize = false }: ItemType) => (
  <Link to={subItem.wicketLink || subItem.route || '#'} key={key}>
    <li className="relative">
      <p
        className={`${
          location.pathname === subItem.route
            ? 'nav-active nav-sub-menu-a'
            : isMinimize
              ? 'hover:!bg-rhino-indigo-blue nav-sub-menu-a'
              : 'nav-sub-menu-a'
        }`}
      >
        <i
          className={`${
            location.pathname === subItem.route ? 'nav-active' : ''
          }`}
        >
          <subItem.icon className="text-[15px]" />
        </i>
        <span
          className={`${
            location.pathname === subItem.route ? 'nav-active' : ''
          }`}
        >
          {t(subItem.label)}
        </span>
      </p>
    </li>
  </Link>
);

const MenuItem = ({
  menuItem,
  setActiveMenu,
  activeMenu,
  minimize,
}: menuItem) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(t(menuItem.label));
  const location = useLocation();
  const { user } = useUser();

  console.log(user);

  useEffect(() => {
    document.title = title;
    menuItem.subItems?.map((item) => {
      if (item.route === location.pathname) {
        setActiveMenu(menuItem.key);
        setTitle(t(item.label));
        return;
      }
    });
  }, [
    title,
    location.pathname,
    setActiveMenu,
    menuItem.key,
    menuItem.subItems,
    t,
  ]);

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
      <a
        href={`${menuItem.link ? menuItem.link : '#'}`}
        target={`${menuItem.link ? 'blank' : ''}`}
        className={`nav-menu-a  ${minimize.isMinimize ? '!px-0 !text-center !flex !items-center !justify-center py-[12px]' : ''}`}
      >
        <i className={`${activeMenu == menuItem.key ? 'nav-active' : ''}`}>
          <menuItem.icon />
        </i>
        {!minimize.isMinimize && (
          <span className={`${activeMenu == menuItem.key ? 'nav-active' : ''}`}>
            {t(menuItem.label)}
          </span>
        )}
      </a>

      {/* Sub Menu Item */}
      {!minimize.isMinimize && (
        <ul className="m-0 p-0 py-[10px] nav-sub-menu">
          {menuItem.subItems?.map((subItem) => {
            if (user?.userType === UserType.SuperAdmin) {
              return (
                <Item
                  subItem={subItem}
                  t={t}
                  key={subItem.key}
                  location={location}
                />
              );
            }
            const isSubItemAllowed = (
              userType: UserType,
              permissions: UserViewPermissions[]
            ) => {
              return subItem.allowedUserType?.includes(userType) &&
                permissions.some((permission) =>
                  subItem.viewPermissions?.includes(permission)
                ) ? (
                <Item
                  subItem={subItem}
                  t={t}
                  key={subItem.key}
                  location={location}
                />
              ) : null;
            };

            if (user?.userType === UserType.ClientAdmin) {
              return isSubItemAllowed(user.userType, [
                UserViewPermissions.GLOBAL_ROLE,
                UserViewPermissions.CLIENT_ADMIN_ROLE,
              ]);
            }

            if (user?.userType === UserType.PartnerAdmin) {
              return isSubItemAllowed(user.userType, [
                UserViewPermissions.GLOBAL_ROLE,
                UserViewPermissions.PARTNER_ADMIN_ROLE,
              ]);
            }

            return subItem.allowedUserType?.some((uType) => {
              if (uType === user?.userType) {
                return subItem.viewPermissions?.some((permission) => {
                  if (permission === UserViewPermissions.GLOBAL_ROLE) {
                    return true;
                  } else {
                    return user?.permissions?.some((userPermission) => {
                      if (userPermission === permission) {
                        return true;
                      }
                    });
                  }
                });
              } else return false;
            }) ? (
              <Item
                subItem={subItem}
                t={t}
                key={subItem.key}
                location={location}
              />
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
