export default {
  // Lint and format all files except those ignored by .prettierignore
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '**/*.{js,jsx,ts,tsx,json,md,yml,yaml}': ['prettier --write'],
};
