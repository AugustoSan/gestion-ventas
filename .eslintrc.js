module.exports = {
  extends: [
    'erb',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier',
    'jsx-a11y',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    // 'import/no-extraneous-dependencies': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // 'react/jsx-filename-extension': 'off',
    // 'import/extensions': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/no-import-module-exports': 'off',
    // 'no-shadow': 'off',
    // '@typescript-eslint/no-shadow': 'error',
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'error',
    "prettier/prettier": "error",
    "@typescript-eslint/no-floating-promises": "off"
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
