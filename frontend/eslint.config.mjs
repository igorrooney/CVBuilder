import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import next from '@next/eslint-plugin-next';

export default [
	js.configs.recommended,
	{
		ignores: ['node_modules', 'dist', '.next'],
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: '.',
			},
			sourceType: 'module',
			ecmaVersion: 'latest',
			globals: {
				console: 'readonly',
				process: 'readonly',
				fetch: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
			react,
			'react-hooks': reactHooks,
			prettier,
			next,
		},
		rules: {
			'prettier/prettier': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'error',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'next/no-html-link-for-pages': 'error',
			'next/no-img-element': 'warn',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
