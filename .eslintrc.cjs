const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

module.exports = {
  parser: "@babel/eslint-parser",
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "FRAMEWORK_SPECIFIC"],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {},
  },
  rules: {
    "prettier/prettier": ["error", prettierOptions],
    "arrow-body-style": [2, "as-needed"],
    "class-methods-use-this": 0,
    "import/imports-first": 0,
    "import/prefer-default-export": 0,
    "react/no-unescaped-entities": 0,
    "no-console": 1,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      alias: {
        map: [],
      },
    },
  },
};
