import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    globalIgnores(["**/temp.js", "config/*", "**/dist/", "**/node_modules/"]),
    {
        extends: compat.extends("eslint:recommended"),

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            ecmaVersion: 12,
            sourceType: "module",
        },

        rules: {
            "no-undef": "off",
            "no-unused-vars": "warn",
        },
    },
]);