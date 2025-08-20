// eslint.config.ts
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
	{
		files: ["**/*.js", "**/*.ts", "**/*.tsx"], // files to lint
		languageOptions: {
			parser: tsParser, // ✅ import the parser as a module
			parserOptions: {
				ecmaVersion: 12,
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			semi: ["error", "always"],          // require semicolons
			"brace-style": ["error", "allman"], // enforce Allman brace style
			indent: ["error", "tab"],           // enforce tab indentation
		},
	},
];
