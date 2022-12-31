module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jquery: true,
  },
  extends: ['plugin:prettier/recommended', 'airbnb-base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
  },
  ignorePatterns: ['dist*'],
};
