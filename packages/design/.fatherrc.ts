import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'dist/esm',
    ignores: ['**/demo/**'],
  },
  cjs: {
    output: 'dist/cjs',
    ignores: ['**/demo/**'],
  },
});
