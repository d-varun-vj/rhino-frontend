import { useEffect, useState } from 'react';
import { MenuItemType } from '../data';
import './MenuItem.css';
import { Link, useLocation } from 'react-router-dom';

type menuItem = {
  menuItem: MenuItemType;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
  activeMenu: string;
};
const MenuItem = ({ menuItem, setActiveMenu, activeMenu }: menuItem) => {
  const [title, setTitle] = useState('Dashboard');
  const location = useLocation();
  useEffect(() => {
    document.title = title;
    menuItem.subItems?.map((item) => {
      if (item.route === location.pathname) {
        setActiveMenu(menuItem.key);
        setTitle(item.label);
        return;
      }
    });
  }, [
    title,
    location.pathname,
    setActiveMenu,
    menuItem.key,
    menuItem.subItems,
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
          {menuItem.label}
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
                  {subItem.label}
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
