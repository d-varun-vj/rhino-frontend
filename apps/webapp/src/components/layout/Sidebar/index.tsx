import { User, UserType, ViewPermissionsType } from '@rhino/apis';
import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import rhinoLogo from '../../../assets/rhino-logo.svg';
import { MenuItems, MenuItemType, MenuKeys } from './config';
import MenuItem from './MenuItem';
import './Sidebar.css';

const handleResizeLogic = (
  setMinimize: Dispatch<
    SetStateAction<{
      isMinimize: boolean;
      item: MenuKeys | '';
    }>
  >
) => {
  setMinimize({
    isMinimize: window.innerWidth < 768,
    item: '',
  });
};

const hasUserTypeAccess = ({
  menuItem,
  user,
}: {
  menuItem: MenuItemType;
  user: User;
}) =>
  menuItem.viewPermissionType === ViewPermissionsType.UserTypeBased &&
  menuItem.allowedUserTypes?.includes(user?.userType);

const hasRoleAccess = ({
  menuItem,
  user,
}: {
  menuItem: MenuItemType;
  user: User;
}) =>
  menuItem.viewPermissionType === ViewPermissionsType.ViewRoleBased &&
  menuItem.viewPermissions?.some((permission) =>
    user?.permissions?.includes(permission)
  );

const canViewMenuItem = ({
  menuItem,
  user,
}: {
  menuItem: MenuItemType;
  user: User;
}) =>
  user?.userType === UserType.SuperAdmin ||
  hasUserTypeAccess({ menuItem, user }) ||
  hasRoleAccess({ menuItem, user });

const SideBar = () => {
  const VITE_STATIC_ASSET_URL: string = import.meta.env
    .VITE_STATIC_ASSET_URL as string;
  const [minimize, setMinimize] = useState<{
    isMinimize: boolean;
    item: MenuKeys | '';
  }>({
    isMinimize: false,
    item: '',
  });
  const { user } = useUser();

  const handleResize = useCallback(
    () => handleResizeLogic(setMinimize),
    [setMinimize]
  );

  const { clients } = useUserFilter();

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <aside
      className={`${minimize.isMinimize ? 'max-w-[4.6875rem] w-[75px]' : 'max-w-[15.2rem]  w-[300px] '} bg-rhino-indigo-blue relative flex-grow flex-shrink-0 basis-auto flex-col flex z-40 will-change-scroll manu-background `}
      onMouseLeave={() =>
        setMinimize({
          isMinimize: minimize.isMinimize,
          item: '',
        })
      }
      data-testid="side-bar"
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
          src={
            clients && clients[0].logo
              ? VITE_STATIC_ASSET_URL + clients[0].logo
              : rhinoLogo
          }
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
              isMinimize: minimize.isMinimize,
              item: minimize.item,
            })
          }
        >
          {/* Main Menu Items */}
          {MenuItems.map((menuItem) =>
            user && canViewMenuItem({ menuItem, user }) ? (
              <MenuItem
                key={menuItem.key}
                menuItem={menuItem}
                minimize={{
                  ...minimize,
                  setItem: setMinimize,
                }}
              />
            ) : null
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
