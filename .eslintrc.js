module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "react-hooks"
  ],
  "extends": [
    'plugin:sonarjs/recommended',
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    'semi': 'error',
    "no-unused-vars": "off",
    "indent": [ "error", 2 ],
    "@typescript-eslint/no-unused-vars": "error",
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
};
