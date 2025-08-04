import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/v1/', // Set base path to match your nginx configuration
  resolve: {
    alias: {
      'apps/webapp/src': resolve(__dirname, 'src'),
      '@rhino/apis': resolve(__dirname, '../../packages/apis/src'),
      '@rhino/utils': resolve(__dirname, '../../packages/utils/src'),
    },
  },
});
