import { createContext } from 'react';
import { FavoriteMeterType } from '../../components/shared/TopRibbon/FavoriteMeter/types';

type FavoriteMeterStore = {
  favoriteMeter: FavoriteMeterType | null;
  setFavoriteMeter: (favoriteMeter: FavoriteMeterType | null) => void;
  clearFavoriteMeter: () => void;
};

export const FavoriteMeterContext = createContext<FavoriteMeterStore>({
  favoriteMeter: null,
  setFavoriteMeter: () => {},
  clearFavoriteMeter: () => {},
});
