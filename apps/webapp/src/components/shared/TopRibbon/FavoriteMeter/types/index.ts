type SharedTenants = {
  uuid: string;
  displayName: string;
  leaseNumber: string;
  groupName: string;
  localizationName: string;
  localisationUuid: string;
  displayNameWithLeaseNumber: string;
  clientName: string;
  m2: string;
  leaseStartDate: string;
  leaseEndDate: string;
};

export type FavType = {
  authorEmail: string | null;
  createdAt: string | null;
  editorEmail: string | null;
  updatedAt: string | null;
  uuid: string;
  name: string;
  measurementUuids: string[];
  authorUuid: string | null;
  editorUuid: string | null;
  readOnly: boolean;
  shared: boolean;
  sharedLocalisations: { uuid: string; name: string }[];
  sharedTenants: SharedTenants[];
  action?: string;
};

export type FavFilter = {
  name: string;
  authorEmail: string;
  shared: string;
};
