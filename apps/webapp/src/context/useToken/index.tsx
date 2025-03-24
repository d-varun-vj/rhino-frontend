import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from '../../utils';

type TokenStore = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};

const TokenContext = createContext<TokenStore>({
  token: null,
  setToken: () => {},
  clearToken: () => {},
});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie: string = getCookie('TOKEN') || '';
    setToken(tokenFromCookie);
  }, []);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        clearToken: () => setToken(null),
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToken = () => {
  return useContext(TokenContext);
};
