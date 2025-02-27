import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'prettier', 'plugin:drizzle/recommended'],
    plugins: ['drizzle'],
    rules: {
      "react/static-property-placement": 0,
      "react/no-unknown-property": 0,
      "import/imports-first": 0,
      "import/newline-after-import": 0,
      "import/no-dynamic-require": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
      "import/no-unresolved": 2,
      "import/no-webpack-loader-syntax": 0,
      "import/prefer-default-export": 0,
      "jsx-a11y/aria-props": 2,
      "jsx-a11y/control-has-associated-label": 0,
      "jsx-a11y/heading-has-content": 0,
      "jsx-a11y/href-no-hash": 0,
      "jsx-a11y/label-has-for": 0,
      "jsx-a11y/mouse-events-have-key-events": 2,
      "jsx-a11y/label-has-associated-control": 0,
      "jsx-a11y/role-has-required-aria-props": 2,
      "jsx-a11y/role-supports-aria-props": 2,
      "max-len": 0,
      "newline-per-chained-call": 0,
      "no-confusing-arrow": 0,
      "no-console": ["error", { "allow": ["error"] }],
      "no-use-before-define": 0,
      "prefer-template": 2,
      "prefer-destructuring": "off",
      "react/forbid-prop-types": 0,
      "react/no-array-index-key": 0,
      "react/jsx-first-prop-new-line": [2, "multiline"],
      "react/jsx-filename-extension": 0,
      "react/jsx-no-target-blank": 0,
      "react/require-default-props": 0,
      "react/require-extension": 0,
      "react/self-closing-comp": 0,
      "class-methods-use-this": 0,
      "arrow-parens": 0,
      "global-require": 0,
      "function-paren-newline": 0,
      "object-curly-newline": 0,
      "no-restricted-syntax": 0,
      "jsx-a11y/anchor-is-valid": [
        2,
        {
          "components": ["Link"],
          "specialLink": ["to"]
        }
      ],
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "react/destructuring-assignment": 0,
      "react/no-access-state-in-setstate": 0,
      "react/jsx-fragments": 0,
      "react/jsx-props-no-spreading": 0,
      "react/jsx-one-expression-per-line": 0,
      "react/react-in-jsx-scope": 0, // we can omit React import
      "import/no-cycle": 0,
      "import/order": 0,
      "react/jsx-curly-newline": 0,
      "camelcase": 1,
      "consistent-return": 0,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "no-else-return": 0,
      "no-multi-spaces": "error",
      "no-mixed-operators": "error",
      "no-nested-ternary": 0,
      "no-param-reassign": 0,
      "no-shadow": 0,
      "no-plusplus": 0,
      "no-unused-vars": [
        "error",
        {
          "args": "after-used",
          "ignoreRestSiblings": true,
          "argsIgnorePattern": "^_"
        }
      ],
      "arrow-body-style": 0,
      "prefer-arrow-callback": 0,
      "import/extensions": 0,
    }
  }),
];

export default eslintConfig;
