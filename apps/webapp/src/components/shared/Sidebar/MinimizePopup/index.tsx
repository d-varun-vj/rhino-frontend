import { UserType, ViewPermissionsType } from '../../../../api/User/types';

import { ItemType } from '../MenuItem';
import { MenuItemType } from '../config';
import { VscTriangleLeft } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/useUser';

const MinimizePopup = ({
  menuItem,
  Item,
}: {
  menuItem: MenuItemType;
  Item: ({ subItem, isMinimize }: ItemType) => JSX.Element;
}) => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <div className="min-w-[300px] absolute left-[75px]  z-40 -mt-10 ">
      {/* Header */}
      <div className="flex items-center">
        <VscTriangleLeft className="text-rhino-indigo-blue-light " />
        <a
          href={`${menuItem.link ? menuItem.link : '#'}`}
          target={`${menuItem.link ? 'blank' : ''}`}
        >
          <div
            className={`py-3 text-white px-4 rounded-lg  bg-rhino-indigo-blue-light min-w-[200px] -ml-[5px] text-sm ${menuItem.subItems ? 'rounded-bl-none  rounded-br-none' : ''}`}
          >
            {t(menuItem.label)}
          </div>
        </a>
      </div>
      <div className="w-full bg-rhino-indigo-blue-light ml-[11px] rounded-lg rounded-tl-none  overflow-hidden">
        {menuItem.subItems?.map((subItem) => {
          if (user?.userType === UserType.SuperAdmin) {
            return (
              <Item subItem={subItem} key={subItem.key} isMinimize={true} />
            );
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
      </div>
    </div>
  );
};

export default MinimizePopup;
