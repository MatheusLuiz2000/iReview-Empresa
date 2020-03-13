module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'prettier',
    "plugin:import/errors",
"plugin:import/warnings",
"plugin:import/typescript",
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import'
  ],
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this":"off",
    "no-param-reassign":"off",
    "camelcase": "off",
    "import/no-unresolved": 1,
    "import/extensions": ["error", "ignorePackages", {
      "js": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never",
      "mjs": "never"
    }],
    "prefer-const": 0,
    "no-var": 2,
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "no-array-constructor" : "off",
    "no-restricted-syntax" : "off",
    "no-await-in-loop": "off",
    "no-continue" : "off"
  }
  }

