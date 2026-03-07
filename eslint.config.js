import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
export default [
  js.configs.recommended,
  {
    extends: ["prettier"],
    languageOptions: {
      globals: globals.browser,
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
      import: importPlugin,
    },

    rules: {
      /* ---------- Unused Code ---------- */

      "no-unused-vars": "off",

      "unused-imports/no-unused-imports": "error",

      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      /* ---------- React ---------- */

      "react/react-in-jsx-scope": "off",

      "react/prop-types": "off",

      /* ---------- Hooks ---------- */

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* ---------- Import Order ---------- */

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];
