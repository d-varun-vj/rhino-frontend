import { User, UserType, ViewPermissionsType } from '@rhino/apis';
import { getRibbonParams } from '../topribbon';
import { FilterData } from '../../context/userFilter/user-filter-context';
import {
  MenuItemType,
  SubItemType,
} from '../../components/layout/Sidebar/config';

const hasUserTypeAccess = ({
  subItem,
  user,
}: {
  subItem: SubItemType;
  user: User;
}) => {
  return (
    subItem.viewPermissionType === ViewPermissionsType.UserTypeBased &&
    subItem.allowedUserTypes?.includes(user?.userType)
  );
};

const hasRoleAccess = ({
  subItem,
  user,
}: {
  subItem: SubItemType;
  user: User | null;
}) => {
  return (
    subItem.viewPermissionType === ViewPermissionsType.ViewRoleBased &&
    subItem.viewPermissions?.some((permission) =>
      user?.permissions?.includes(permission)
    )
  );
};

export const canViewItem = ({
  subItem,
  user,
}: {
  subItem: SubItemType;
  user: User;
}) => {
  let extraConditions = true;
  if (subItem.renderCondition) {
    extraConditions = subItem.renderCondition();
  }

  return (
    extraConditions &&
    (user?.userType === UserType.SuperAdmin ||
      hasUserTypeAccess({ subItem, user }) ||
      hasRoleAccess({ subItem, user }))
  );
};

export const getToNavLink = ({
  subItem,
  client,
  location,
  group,
}: {
  subItem: SubItemType;
  client: FilterData | null;
  location: FilterData | null;
  group: FilterData | null;
}) => {
  return (
    (subItem.wicketLink &&
      subItem.wicketLink + getRibbonParams({ client, location, group })) ||
    (subItem.route &&
      subItem.route + getRibbonParams({ client, location, group })) ||
    '#'
  );
};

export const resolveMenuLink = (menuItem: MenuItemType): string => {
  if (menuItem.link) return menuItem.link;

  const routeItem = menuItem.subItems?.find((sub) => sub.route);
  if (routeItem?.route) return routeItem.route;

  const wicketItem = menuItem.subItems?.find((sub) => sub.wicketLink);
  if (wicketItem?.wicketLink) return wicketItem.wicketLink;

  return (
    menuItem.subItems?.[0]?.route || menuItem.subItems?.[0]?.wicketLink || '#'
  );
};
