import { resolve } from 'path';
import { defineConfig } from 'vite';
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
});
