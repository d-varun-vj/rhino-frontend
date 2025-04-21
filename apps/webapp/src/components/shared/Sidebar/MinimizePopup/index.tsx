import { VscTriangleLeft } from 'react-icons/vsc';
import { ItemType } from '../MenuItem';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../../../context/useUser';
import { UserType, ViewPermissionsType } from '../../../../api/User/types';
import { MenuItemType } from '../data';

const MinimizePopup = ({
  menuItem,
  Item,
}: {
  menuItem: MenuItemType;
  Item: ({ subItem, t, location, isMinimize }: ItemType) => JSX.Element;
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useUser();
  return (
    <div className="w-[300px]   absolute left-[75px]  z-40 -mt-10 ">
      {/* Header */}
      <div className="flex items-center">
        <VscTriangleLeft className="text-rhino-indigo-blue-light " />
        <a
          href={`${menuItem.link ? menuItem.link : '#'}`}
          target={`${menuItem.link ? 'blank' : ''}`}
        >
          <div
            className={`py-3 text-white px-4 rounded-lg  bg-rhino-indigo-blue-light min-w-[200px] -ml-[5px] text-[14px] ${menuItem.subItems ? 'rounded-bl-none  rounded-br-none' : ''}`}
          >
            {t(menuItem.label)}
          </div>
        </a>
      </div>
      <div className="w-full bg-rhino-indigo-blue-light ml-[11px] rounded-lg rounded-tl-none  overflow-hidden">
        {menuItem.subItems?.map((subItem) => {
          if (user?.userType === UserType.SuperAdmin) {
            return (
              <Item
                subItem={subItem}
                t={t}
                key={subItem.key}
                location={location}
                isMinimize={true}
              />
            );
          }
          return subItem.viewPermissionType ===
            ViewPermissionsType.UserTypeBased &&
            subItem.allowedUserTypes?.some((uType) => {
              if (uType === user?.userType) {
                return true;
              }
            }) ? (
            <Item subItem={subItem} t={t} location={location} />
          ) : subItem.viewPermissionType ===
              ViewPermissionsType.ViewRoleBased &&
            subItem.viewPermissions?.some((permission) => {
              return user?.permissions?.some((userPermission) => {
                if (userPermission === permission) {
                  return true;
                }
              });
            }) ? (
            <Item subItem={subItem} t={t} location={location} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MinimizePopup;
