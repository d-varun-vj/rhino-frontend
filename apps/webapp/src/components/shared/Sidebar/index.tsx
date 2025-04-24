import './Sidebar.css';
import rhinoLogo from '../../../assets/rhino-logo.svg';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { MENU_KEYS, MenuItems } from './data';
import MenuItem from './MenuItem';
import { useUser } from '../../../context/useUser';
import { UserType, ViewPermissionsType } from '../../../api/User/types';

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState<MENU_KEYS>(MENU_KEYS.DASHBOARD);
  const [minimize, setMinimize] = useState<{
    isMinimize: boolean;
    item: MENU_KEYS | '';
  }>({
    isMinimize: false,
    item: '',
  });
  const { user } = useUser();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMinimize({
          isMinimize: true,
          item: '',
        });
      } else {
        setMinimize({
          isMinimize: false,
          item: '',
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setMinimize]);

  return (
    <aside
      className={`${minimize.isMinimize ? 'max-w-[4.6875rem]    w-[75px]' : 'max-w-[15.2rem]  w-[300px] '} bg-rhino-indigo-blue relative flex-grow flex-shrink-0 basis-auto flex-col flex z-40 will-change-scroll manu-background `}
      onMouseLeave={() =>
        setMinimize({
          isMinimize: minimize.isMinimize,
          item: '',
        })
      }
    >
      {/* Minimize Button */}
      <ul className="p-0 m-0">
        <li
          className="mb-0 relative hover:bg-[#0000001a] cursor-pointer "
          onClick={() =>
            setMinimize({
              isMinimize: !minimize.isMinimize,
              item: minimize.item,
            })
          }
        >
          {minimize.isMinimize ? (
            <div className="text-[#fff] flex items-center justify-center outline-0 py-[13px] px-[1rem]  font-[400] relative ">
              <FaAngleDoubleRight className="text-[1.125rem] " />
            </div>
          ) : (
            <div className="text-[#fff] flex items-center outline-0 py-[13px] px-[2rem] text-[13px] font-[400] relative">
              <FaAngleDoubleLeft className="text-[1.125rem] " />
            </div>
          )}
        </li>
      </ul>

      {/* LOGO */}
      <div
        className={`${minimize.isMinimize ? 'opacity-0' : 'opacity-100'} flex h-[38px] my-[1rem] justify-center flex-row `}
      >
        <img
          src={rhinoLogo}
          alt="Rhino Logo"
          className="object-contain max-w-full h-auto"
        />
      </div>

      {/* Menu */}
      <nav className="overflow-auto overflow-x-hidden block">
        <ul
          className="m-0 p-0"
          onMouseLeave={() =>
            setMinimize({
              isMinimize: minimize.isMinimize ? minimize.isMinimize : false,
              item: minimize.item,
            })
          }
        >
          {/* Main Menu Item*/}
          {MenuItems.map((menuItem) => {
            if (user?.userType === UserType.SuperAdmin) {
              return (
                <MenuItem
                  key={menuItem.key}
                  menuItem={menuItem}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  minimize={{
                    ...minimize,
                    setItem: setMinimize,
                  }}
                />
              );
            }
            return menuItem.viewPermissionType ===
              ViewPermissionsType.UserTypeBased &&
              menuItem.allowedUserTypes?.some((uType) => {
                if (uType === user?.userType) {
                  return true;
                }
              }) ? (
              <MenuItem
                key={menuItem.key}
                menuItem={menuItem}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                minimize={{
                  ...minimize,
                  setItem: setMinimize,
                }}
              />
            ) : menuItem.viewPermissionType ===
                ViewPermissionsType.ViewRoleBased &&
              menuItem.viewPermissions?.some((permission) => {
                return user?.licences?.some((userPermission) => {
                  if (userPermission === permission) {
                    return true;
                  }
                });
              }) ? (
              <MenuItem
                key={menuItem.key}
                menuItem={menuItem}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                minimize={{
                  ...minimize,
                  setItem: setMinimize,
                }}
              />
            ) : null;
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
