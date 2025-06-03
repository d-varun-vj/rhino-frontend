import React, { useState } from 'react';
import { FavoriteMeterContext } from './favorite-meter-context';
import { FavoriteMeterType } from '@rhino/apis/FavoriteMeter/types';

export const FavoriteMeterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteMeter, setFavoriteMeter] = useState<FavoriteMeterType | null>(
    null
  );

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
