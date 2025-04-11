import { VscTriangleLeft } from 'react-icons/vsc';
import { ItemType } from '../MenuItem';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../../../context/useUser';
import { UserType, UserViewPermissions } from '../../../../api/User/types';
import { MENU_KEYS, MenuItemType } from '../data';

const MinimizePopup = ({
  menuItem,
  Item,
}: {
  menuItem: MenuItemType;
  Item: ({ subItem, t, key, location, isMinimize }: ItemType) => JSX.Element;
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
            className={`py-3 text-white px-4 rounded-lg  bg-rhino-indigo-blue-light min-w-[200px] -ml-[5px] text-[14px] ${menuItem.key === MENU_KEYS.SUPPORT ? '' : 'rounded-bl-none  rounded-br-none'}`}
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
                isMinimize={true}
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
              isMinimize={true}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MinimizePopup;
