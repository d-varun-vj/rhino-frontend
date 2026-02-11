import { useContext } from 'react';
import { FeatureFlagContext } from './feature-flag-context';

export const useFeatureFlags = () => {
  return useContext(FeatureFlagContext);
};
