import { Feature, User, UserType, ViewPermissionsType } from '@rhino/apis';
import {
  MenuItemType,
  SubItemType,
} from '../../components/layout/Sidebar/config';
import { FilterData } from '../../context/userFilter/user-filter-context';
import { getFeature } from '../featureFlag';
import { getRibbonParams } from '../topribbon';

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
  features,
}: {
  subItem: SubItemType;
  user: User;
  features: Feature | null;
}) => {
  let renderCondition = true;
  if (subItem.renderCondition) {
    renderCondition = subItem.renderCondition();
  }

  let enabledFeatureFlag;
  if (subItem.featureFlag) {
    enabledFeatureFlag = getFeature(features, subItem.featureFlag);
  } else {
    enabledFeatureFlag = true;
  }

  return (
    enabledFeatureFlag &&
    renderCondition &&
    (user?.userType === UserType.SuperAdmin ||
      hasUserTypeAccess({ subItem, user }) ||
      hasRoleAccess({ subItem, user }))
  );
};

export const getToNavLink = ({
  subItem,
  clients,
  locations,
  groups,
}: {
  subItem: SubItemType;
  clients: FilterData[] | null;
  locations: FilterData[] | null;
  groups: FilterData[] | null;
}) => {
  const ribbonParams = getRibbonParams({ clients, locations, groups });

  if (ribbonParams === '?location=null&group=null&client=null') {
    const currentParams =
      window.location.search || '?location=null&group=null&client=null';
    return (subItem.wicketLink || subItem.route || '#') + currentParams;
  }

  return (
    (subItem.wicketLink && subItem.wicketLink + ribbonParams) ||
    (subItem.route && subItem.route + ribbonParams) ||
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
