import { createRequire } from 'node:module';
import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import { defineConfig, globalIgnores } from 'eslint/config';

const require = createRequire(import.meta.url);
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const tsParser = require('@typescript-eslint/parser');

export default defineConfig([
  globalIgnores([
    'dist/',
    '.astro/',
    'node_modules/',
    'coverage/',
    'playwright-report/',
    'test-results/',
    'junit/',
  ]),
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  { files: ['**/*.{js,jsx,mjs}'], ...reactHooks.configs.flat.recommended },
  { files: ['**/*.{js,jsx,mjs}'], ...jsxA11y.flatConfigs.recommended },

  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
  },

  {
    files: ['e2e/**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    files: ['*.config.{js,mjs}', 'scripts/**'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['test/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        vi: 'readonly',
      },
    },
  },
]);
