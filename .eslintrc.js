module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "tsconfig.json",
    createDefaultProgram: true,
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    quotes: [2, "double"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
