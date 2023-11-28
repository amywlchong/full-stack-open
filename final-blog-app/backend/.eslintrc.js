module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
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
};
