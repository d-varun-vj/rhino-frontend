import React, { useState } from 'react';

import { FilterData } from '../userFilter/user-filter-context';
import { FavoriteMeterContext } from './favorite-meter-context';

export const FavoriteMeterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteMeter, setFavoriteMeter] = useState<FilterData | null>(null);

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
