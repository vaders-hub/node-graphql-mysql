module.exports = {
  env: {
    // amd: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "esnext",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "typescript.suggestionActions.enabled": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "no-return-await": 2,
    curly: 2,
    "@typescript-eslint/no-unused-vars": [0],
    "@typescript-eslint/no-inferrable-types": [
      "error",
      {
        ignoreParameters: true,
        ignoreProperties: true,
      },
    ],
  },
};
