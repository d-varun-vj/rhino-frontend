import {
  User,
  UserType,
  UserViewPermission,
  ViewPermissionsType,
} from '@rhino/apis';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user';
import { locations } from '../../routes/locations';

type AuthorizeProps = {
  children: React.ReactNode;
  viewPermissionType: ViewPermissionsType;
  viewPermissions?: UserViewPermission[];
  allowedUserTypes?: UserType[];
};

const canViewItem = ({
  permissionType,
  user,
  allowedUserTypes,
  viewPermissions,
}: {
  permissionType: ViewPermissionsType;
  user: User;
  allowedUserTypes?: UserType[];
  viewPermissions?: UserViewPermission[];
}) => {
  if (user?.userType === UserType.SuperAdmin) {
    return true;
  }

  if (permissionType === ViewPermissionsType.UserTypeBased) {
    return allowedUserTypes && hasUserTypeAccess({ allowedUserTypes, user });
  }

  if (permissionType === ViewPermissionsType.ViewRoleBased) {
    return viewPermissions && hasRoleAccess({ viewPermissions, user });
  }
};

const hasUserTypeAccess = ({
  allowedUserTypes,
  user,
}: {
  allowedUserTypes: UserType[];
  user: User;
}) => {
  return allowedUserTypes?.includes(user?.userType);
};

const hasRoleAccess = ({
  viewPermissions,
  user,
}: {
  viewPermissions: UserViewPermission[];
  user: User | null;
}) => {
  return viewPermissions?.some((permission) =>
    user?.permissions?.includes(permission)
  );
};

const AccessAuthorizer = ({
  children,
  viewPermissionType,
  allowedUserTypes,
  viewPermissions,
}: AuthorizeProps) => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (
    user &&
    !canViewItem({
      user,
      permissionType: viewPermissionType,
      viewPermissions: viewPermissions,
      allowedUserTypes: allowedUserTypes,
    })
  ) {
    navigate(locations.notAllowed, { replace: true });
  } else {
    return <>{children}</>;
  }
};

export default AccessAuthorizer;
