export type User = {
  id: number;
  uuid: string;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  language: string;
  active: boolean;
  userType: string;
  created: string;
  measurements: string[] | null;
  clients: string[] | null;
  adminPermittedLocalisations: string[] | null;
  permissions: string[] | null;
  tenants: string[] | null;
  licences: string[] | null;
  lastLogin: string | null;
  structureAccess: {
    resourceAccesses: string[] | null;
    assignedClientUuid: string | null;
  };
};
