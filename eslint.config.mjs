import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import nx from '@nx/eslint-plugin';

export default [
  // Configurações base da Nx
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // Regras do Prettier (formatação)
  eslintPluginPrettierRecommended,

  // Ignorar pasta de build
  {
    ignores: ['**/dist'],
  },

  // Regras gerais para TypeScript e JavaScript
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {},
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      // Angular-specific rules
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
        },
      ],
      // Desativando regras desnecessárias
      'no-useless-constructor': 'off',
      'dot-notation': 'off',
      camelcase: 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },

  // Regras para HTML templates do Angular
  {
    files: ['**/*.html'],
    languageOptions: {},
    plugins: {},
    rules: {
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
    },
  },

  // Bloco reservado para possíveis regras adicionais
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {},
  },
];
