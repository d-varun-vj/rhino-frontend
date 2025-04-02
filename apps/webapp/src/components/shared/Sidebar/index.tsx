import './Sidebar.css';
import rhinoLogo from '../../../assets/rhino-logo.svg';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { useState } from 'react';
import { MenuItems } from './data';
import MenuItem from './MenuItem';

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState('dashboards');

  return (
    <aside className="max-w-[15.2rem] bg-rhino-indigo-blue relative flex-grow flex-shrink-0 basis-auto w-[300px] flex-col flex z-40 will-change-scroll manu-background max-sm:hidden">
      {/* Minimize Button */}
      <ul className="p-0 m-0">
        <li className="mb-0 relative">
          <a
            href=""
            className="text-[#fff] flex items-center outline-0 py-[13px] px-[2rem] text-[13px] font-[400] relative"
          >
            <FaAngleDoubleLeft className="text-[1.125rem]" />
          </a>
        </li>
      </ul>

      {/* LOGO */}
      <div className="flex h-[38px] my-[1rem] justify-center flex-row ">
        <img
          src={rhinoLogo}
          alt="Rhino Logo"
          className="object-contain max-w-full h-auto"
        />
      </div>

      {/* Menu */}
      <nav className="overflow-auto overflow-x-hidden block">
        <ul className="m-0 p-0">
          {/* Main Menu Item*/}
          {MenuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.key}
              menuItem={menuItem}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
