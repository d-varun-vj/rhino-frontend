import { Feature } from '@rhino/apis';
import { createContext } from 'react';

type FeatureFlagStore = {
  features: Feature | null;
  setFeatures: (flag: Feature | null) => void;
};

export const FeatureFlagContext = createContext<FeatureFlagStore>({
  features: null,
  setFeatures: () => {},
});
