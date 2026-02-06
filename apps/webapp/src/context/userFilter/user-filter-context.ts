import { createContext } from 'react';

export type FilterData = { name: string; uuid: string; logo?: string };

type FilterState = {
  clients: FilterData[] | null;
  locations: FilterData[] | null;
  groups: FilterData[] | null;
};

type FilterAction = {
  setClients: (data: FilterData[] | null) => void;
  setLocations: (data: FilterData[] | null) => void;
  setGroups: (data: FilterData[] | null) => void;
  clearAll: () => void;
};

type FilterStore = FilterState & FilterAction;

export const UserFilterContext = createContext<FilterStore>({
  clients: null,
  locations: null,
  groups: null,
  setClients: () => {},
  setLocations: () => {},
  setGroups: () => {},
  clearAll: () => {},
});
