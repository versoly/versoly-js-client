import { defaultExclude, defineConfig } from 'vitest/config';

const coverageExclude = [...defaultExclude, 'commitlint.config.*', '.eslintrc.*', 'src/client/**'];

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
      exclude: coverageExclude,
    },
  },
});
