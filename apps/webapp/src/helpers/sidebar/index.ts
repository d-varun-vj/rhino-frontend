import { User, UserType, ViewPermissionsType } from '@rhino/apis';
import { SubItemType } from '../../components/Sidebar/config';
import { getRibbonParams } from '../topribbon';
import { FilterData } from '../../context/userFilter/user-filter-context';

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
  return (
    user?.userType === UserType.SuperAdmin ||
    hasUserTypeAccess({ subItem, user }) ||
    hasRoleAccess({ subItem, user })
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
