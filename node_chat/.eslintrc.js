module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['react-app', 'react-app/jest', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.test.js', '*.data.js', '*.stories.js'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'jest/valid-expect': 'off',
        'jest/valid-title': 'off',
        'no-unused-vars': 'off',
        'jest/valid-expect-in-promise': 'off'
      }
    }
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2017'
  },
  globals: {},
  rules: {
    'prettier/prettier': ['warn'],
    'no-console': ['off'],
    'no-redeclare': 'off'
  }
};
