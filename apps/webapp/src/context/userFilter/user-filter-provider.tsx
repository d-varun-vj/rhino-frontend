import { useState } from 'react';
import { FilterData, UserFilterContext } from './user-filter-context';

export const UserFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clients, setClients] = useState<FilterData[] | null>(null);
  const [locations, setLocations] = useState<FilterData[] | null>(null);
  const [groups, setGroups] = useState<FilterData[] | null>(null);

  const clearAll = () => {
    setClients(null);
    setLocations(null);
    setGroups(null);
  };

  return (
    <UserFilterContext.Provider
      value={{
        clients,
        locations,
        groups,
        setClients,
        setLocations,
        setGroups,
        clearAll,
      }}
    >
      {children}
    </UserFilterContext.Provider>
  );
};
