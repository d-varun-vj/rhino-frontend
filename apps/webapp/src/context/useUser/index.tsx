import React, { createContext, useEffect, useState } from 'react';
import { User } from '../../api/User/types';
import { useQuery } from '@tanstack/react-query';
import { DATA_QUERY_KEYS } from '../../api/data-query-keys';
import { getUser } from '../../api/User';

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserStore>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { data: userData } = useQuery({
    queryKey: [...DATA_QUERY_KEYS.getUser()],
    queryFn: getUser,
  });

  useEffect(() => {
    setUser(userData ? userData : null);
  }, [userData]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return React.useContext(UserContext);
};
