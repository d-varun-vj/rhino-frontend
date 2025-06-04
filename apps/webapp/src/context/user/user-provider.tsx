import { useEffect, useState } from 'react';
import { User, useGetUserDetails } from '@rhino/apis';
import { UserContext } from './user-context';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { data: userData } = useGetUserDetails();

  useEffect(() => {
    setUser(userData ?? null);
  }, [userData]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
