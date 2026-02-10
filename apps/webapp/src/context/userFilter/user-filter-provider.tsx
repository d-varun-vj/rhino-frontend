import { useState } from 'react';
import { FilterData, UserFilterContext } from './user-filter-context';

export const UserFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [client, setClient] = useState<FilterData | null>(null);
  const [location, setLocation] = useState<FilterData | null>(null);
  const [group, setGroup] = useState<FilterData | null>(null);

  const clearAll = () => {
    setClient(null);
    setLocation(null);
    setGroup(null);
  };

  return (
    <UserFilterContext.Provider
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
    </UserFilterContext.Provider>
  );
};
