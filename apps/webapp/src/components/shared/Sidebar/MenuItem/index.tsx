import { useEffect, useState } from 'react';
import { MenuItemType } from '../data';
import './MenuItem.css';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type menuItem = {
  menuItem: MenuItemType;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
  activeMenu: string;
};
const MenuItem = ({ menuItem, setActiveMenu, activeMenu }: menuItem) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(t(menuItem.label));
  const location = useLocation();
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
        {menuItem.subItems?.map((subItem) => (
          <Link
            to={
              subItem.wicketLink
                ? subItem.wicketLink
                : subItem.route
                  ? subItem.route
                  : '#'
            }
            key={subItem.key}
          >
            <li className="relative">
              <p
                className={`${location.pathname == subItem.route ? 'nav-active nav-sub-menu-a' : 'nav-sub-menu-a'}`}
              >
                <i
                  className={`${location.pathname == subItem.route ? 'nav-active' : ''}`}
                >
                  <subItem.icon className="text-[15px]" />
                </i>
                <span
                  className={`${location.pathname == subItem.route ? 'nav-active' : ''}`}
                >
                  {t(subItem.label)}
                </span>
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </li>
  );
};

export default MenuItem;
