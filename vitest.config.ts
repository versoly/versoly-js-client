import { defaultExclude, defineConfig } from 'vitest/config';

const coverageExclude = [...defaultExclude, 'commitlint.config.*', '.eslintrc.*', 'src/client/**'];

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
      exclude: coverageExclude,
    },
  },
});
