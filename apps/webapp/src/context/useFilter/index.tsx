import { createContext, useContext, useState } from 'react';

type FilterData = { name: string; uuid: string };

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

const FilterContext = createContext<FilterStore>({
  client: null,
  location: null,
  group: null,
  setClient: () => {},
  setLocation: () => {},
  setGroup: () => {},
  clearAll: () => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<FilterData | null>(null);
  const [location, setLocation] = useState<FilterData | null>(null);
  const [group, setGroup] = useState<FilterData | null>(null);

  const clearAll = () => {
    setClient(null);
    setLocation(null);
    setGroup(null);
  };

  return (
    <FilterContext.Provider
      value={{
        client,
        location,
        group,
        setClient,
        setLocation,
        setGroup,
        clearAll,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => {
  return useContext(FilterContext);
};
