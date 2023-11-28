/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "jest"],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
    // Disable style rules to let prettier own it
    "object-curly-spacing": "off",
    "comma-dangle": "off",
    "max-len": "off",
    indent: "off",
    "no-mixed-operators": "off",
    "no-console": "off",
    "arrow-parens": "off",
    "generator-star-spacing": "off",
    "space-before-function-paren": "off",
    "jsx-quotes": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
