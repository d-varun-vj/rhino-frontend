import { useEffect, useState } from 'react';
import { MenuItemType, SubItemType } from '../data';
import './MenuItem.css';
import { Link, Location, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/useUser';
import { UserType, UserViewPermissions } from '../../../../api/User/types';
import { TFunction } from 'i18next';

type menuItem = {
  menuItem: MenuItemType;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
  activeMenu: string;
};

const Item = ({
  subItem,
  t,
  key,
  location,
}: {
  subItem: SubItemType;
  t: TFunction<'translation', undefined>;
  key?: string;
  location: Location<string>;
}) => (
  <Link to={subItem.wicketLink || subItem.route || '#'} key={key}>
    <li className="relative">
      <p
        className={`${
          location.pathname === subItem.route
            ? 'nav-active nav-sub-menu-a'
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

const MenuItem = ({ menuItem, setActiveMenu, activeMenu }: menuItem) => {
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
    <li className="relative" key={menuItem.key}>
      <a
        href={`${menuItem.link ? menuItem.link : '#'}`}
        target={`${menuItem.link ? 'blank' : ''}`}
        className="nav-menu-a"
        // onClick={() => {
        //   setActiveMenu(menuItem.key);
        //   setActiveSubmenuItem(
        //     menuItem.subItems ? menuItem.subItems[0].key : menuItem.key
        //   );
        // }}
      >
        <i className={`${activeMenu == menuItem.key ? 'nav-active' : ''}`}>
          <menuItem.icon />
        </i>
        <span className={`${activeMenu == menuItem.key ? 'nav-active' : ''}`}>
          {t(menuItem.label)}
        </span>
      </a>
      {/* Sub Menu Item */}
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
          if (user?.userType === UserType.ClientAdmin) {
            return subItem.allowedUserType?.some((uType) => {
              if (uType === user?.userType) {
                return subItem.viewPermissions?.some((permission) => {
                  if (permission === UserViewPermissions.GLOBEL_ROLE) {
                    return true;
                  } else if (
                    permission === UserViewPermissions.CLIENT_ADMIN_ROLE
                  ) {
                    return true;
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
          }
          return subItem.allowedUserType?.some((uType) => {
            if (uType === user?.userType) {
              return subItem.viewPermissions?.some((permission) => {
                if (permission === UserViewPermissions.GLOBEL_ROLE) {
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
    </li>
  );
};

export default MenuItem;
