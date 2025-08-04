import { UserType } from '@rhino/apis';

type SharingProp = {
  userType: UserType | null;
  sharingField: 'Location' | 'Tenant';
  isUpdatePage?: boolean;
  userUuid?: string;
  authorUuid?: string;
};

export const shouldSharingFieldBeVisible = ({
  userType,
  sharingField,
  isUpdatePage = false,
  authorUuid,
  userUuid,
}: SharingProp) => {
  if (!userType) return;

  let isVisible = shouldSharingBeVisible(userType);

  if (sharingField === 'Location') {
    isVisible = shouldLocalisationSharingBeVisible(userType);
  }

  return isUpdatePage
    ? isVisible && isAuthorOrSuperAdmin({ authorUuid, userUuid, userType })
    : isVisible;
};

const shouldLocalisationSharingBeVisible = (userType: UserType) => {
  return [
    UserType.SuperAdmin,
    UserType.PartnerAdmin,
    UserType.ClientAdmin,
    UserType.LocalisationAdmin,
  ].includes(userType);
};

const shouldSharingBeVisible = (userType: UserType) => {
  return [
    UserType.SuperAdmin,
    UserType.PartnerAdmin,
    UserType.ClientAdmin,
    UserType.LocalisationAdmin,
    UserType.Tenant,
  ].includes(userType);
};

const isAuthorOrSuperAdmin = ({
  authorUuid,
  userUuid,
  userType,
}: {
  authorUuid?: string;
  userUuid?: string;
  userType: UserType;
}) => {
  return UserType.SuperAdmin === userType || authorUuid === userUuid;
};
