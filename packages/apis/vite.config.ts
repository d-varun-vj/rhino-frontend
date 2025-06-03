import { defineConfig } from 'vite';
import { resolve } from 'path';
import packageJson from './package.json';

const packageName = packageJson.name.split('/').pop() || packageJson.name;

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      name: packageName,
      fileName: (format) => `index.${format}.js`,
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@rhino/utils': resolve(__dirname, '../utils/src'),
    },
  },
});
