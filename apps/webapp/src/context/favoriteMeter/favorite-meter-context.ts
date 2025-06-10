import { createContext } from 'react';
import { FilterData } from '../userFilter/user-filter-context';

type FavoriteMeterStore = {
  favoriteMeter: FilterData | null;
  setFavoriteMeter: (favoriteMeter: FilterData | null) => void;
  clearFavoriteMeter: () => void;
};

export const FavoriteMeterContext = createContext<FavoriteMeterStore>({
  favoriteMeter: null,
  setFavoriteMeter: () => {},
  clearFavoriteMeter: () => {},
});
