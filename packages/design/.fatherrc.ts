import { defineConfig } from 'father';

export default defineConfig({
  extends:"../../.fatherrc.ts",
  esm: {
    ignores: ['**/demo/**'],
  },
  cjs: {
    ignores: ['**/demo/**'],
  },
});
