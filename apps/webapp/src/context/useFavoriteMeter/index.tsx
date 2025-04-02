import React, { createContext, useState } from 'react';
import { FavType } from '../../components/shared/TopRibbon/FavoriteMeter/types';

type FavoriteMeterStore = {
  favoriteMeter: FavType | null;
  setFavoriteMeter: (favoriteMeter: FavType | null) => void;
  clearFavoriteMeter: () => void;
};

const FavoriteMeterContext = createContext<FavoriteMeterStore>({
  favoriteMeter: null,
  setFavoriteMeter: () => {},
  clearFavoriteMeter: () => {},
});

export const FavoriteMeterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteMeter, setFavoriteMeter] = useState<FavType | null>(null);
  const clearFavoriteMeter = () => {
    setFavoriteMeter(null);
  };

  return (
    <FavoriteMeterContext.Provider
      value={{
        favoriteMeter,
        setFavoriteMeter,
        clearFavoriteMeter,
      }}
    >
      {children}
    </FavoriteMeterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavoriteMeter = () => {
  return React.useContext(FavoriteMeterContext);
};
