import { Feature, Flag } from '@rhino/apis';

export const getFeature = (
  features: Feature | null,
  flag: keyof typeof Flag
): boolean => {
  return features ? features[flag] : false;
};

export const getAllFeatres = () => {
  return Object.keys(Flag);
};
