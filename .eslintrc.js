module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@typescript-eslint/strict"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: [
		"@typescript-eslint",
    "import"
  ],
  rules: {
    "@typescript-eslint/indent": ["error", "tab", { "SwitchCase": 1 }],
    '@typescript-eslint/no-magic-numbers': ['error', { ignore: [-1, 0, 1, 2] }],
		"no-trailing-spaces": ["error", { "ignoreComments": true }],
		"@typescript-eslint/consistent-type-imports": "error",
		"quotes": ["error", "single"],
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
		'no-trailing-spaces': ['error', { ignoreComments: true }],
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    quotes: ['error', 'single'],
    "import/order": [
      "error",
      {
        groups: [
          "external",
          "internal",
          "index",
          "sibling",
          "parent",
          "builtin",
          "object",
          "type"
        ],
        "newlines-between": "always"
      }
    ],
    'object-curly-spacing': ["error", "always"],
    semi: ["error", "always"],
  },
};