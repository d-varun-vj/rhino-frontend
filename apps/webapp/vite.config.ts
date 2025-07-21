import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '', // we need to set the base path for the assets, we should change this in the Dockerfile as well
  resolve: {
    alias: {
      'apps/webapp/src': resolve(__dirname, 'src'),
      '@rhino/apis': resolve(__dirname, '../../packages/apis/src'),
      '@rhino/utils': resolve(__dirname, '../../packages/utils/src'),
    },
  },
});
