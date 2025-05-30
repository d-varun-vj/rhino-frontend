import React from 'react';

import { FavoriteMeterContext } from './favorite-meter-context';

export const useFavoriteMeter = () => {
  return React.useContext(FavoriteMeterContext);
};
