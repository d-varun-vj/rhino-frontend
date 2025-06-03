import { User, UserType } from '@rhino/apis';

export const shouldSetInitialClient = (user: User) => {
  return (
    user.userType === UserType.ClientAdmin ||
    user.userType === UserType.LocalisationAdmin ||
    user.userType === UserType.RegularUser ||
    user.userType === UserType.Tenant
  );
};
