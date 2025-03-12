module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // Можно отключить или смягчить правила, которые мешают
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
