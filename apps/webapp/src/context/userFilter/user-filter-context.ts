import { createContext } from 'react';
export type FilterData = { name: string; uuid: string };

type FilterState = {
  client: FilterData | null;
  location: FilterData | null;
  group: FilterData | null;
};

type FilterAction = {
  setClient: (data: FilterData | null) => void;
  setLocation: (data: FilterData | null) => void;
  setGroup: (data: FilterData | null) => void;
  clearAll: () => void;
};

type FilterStore = FilterState & FilterAction;

export const UserFilterContext = createContext<FilterStore>({
  client: null,
  location: null,
  group: null,
  setClient: () => {},
  setLocation: () => {},
  setGroup: () => {},
  clearAll: () => {},
});
