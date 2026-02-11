import { Feature, useGetFeatureFlags } from '@rhino/apis';
import React, { useEffect, useState } from 'react';

import { getAllFeatres } from '../../helpers/featureFlag';
import { FeatureFlagContext } from './feature-flag-context';

export const FeatureFlagProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [features, setFeatures] = useState<Feature | null>(null);

  const { data: flags } = useGetFeatureFlags({ features: getAllFeatres() });

  useEffect(() => {
    if (flags) setFeatures(flags);
  }, [flags]);

  return (
    <FeatureFlagContext.Provider value={{ features, setFeatures }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
