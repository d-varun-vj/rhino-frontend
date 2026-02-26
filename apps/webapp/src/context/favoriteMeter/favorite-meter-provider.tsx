import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FilterData } from '../userFilter/user-filter-context';
import { FavoriteMeterContext } from './favorite-meter-context';

export const FavoriteMeterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteMeter, setFavoriteMeter] = useState<FilterData | null>(null);

  const [searchParams] = useSearchParams();
  const paramUuid = searchParams.get('favoriteMeterUuid');
  const paramName = searchParams.get('favoriteMeterName');

  useEffect(() => {
    if (paramUuid && paramName) {
      setFavoriteMeter((prev) => {
        if (prev?.uuid === paramUuid && prev?.name === paramName) return prev;
        return { uuid: paramUuid, name: paramName };
      });
    } else {
      setFavoriteMeter((prev) => (prev === null ? prev : null));
    }
  }, [paramUuid, paramName]);

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
