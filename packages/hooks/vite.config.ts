/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import packageJson from './package.json';
import { resolve } from 'path';

const packageName = packageJson.name.split('/').pop() || packageJson.name;

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name: packageName,
      fileName: 'lib',
    },
  },
  plugins: [dts({ rollupTypes: true })],
  test: {},
});
