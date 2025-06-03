import { createContext } from 'react';

import { User } from '@rhino/apis';

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserStore>({
  user: null,
  setUser: () => {},
});
