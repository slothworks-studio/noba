// module.exports = {
// 	root: true,
// 	parser: '@typescript-eslint/parser',
// 	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
// 	plugins: ['svelte3', '@typescript-eslint'],
// 	ignorePatterns: ['*.cjs'],
// 	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
// 	settings: {
// 		'svelte3/typescript': () => require('typescript')
// 	},
// 	parserOptions: {
// 		sourceType: 'module',
// 		ecmaVersion: 2019
// 	},
// 	env: {
// 		browser: true,
// 		es2017: true,
// 		node: true
// 	},
// 	rules: {
// 		'@typescript-eslint/interface-name-prefix': 'off',
// 		'@typescript-eslint/explicit-function-return-type': 'off',
// 		'@typescript-eslint/explicit-module-boundary-types': 'off',
// 		'@typescript-eslint/no-explicit-any': 'off',
// 		'@typescript-eslint/no-empty-function': 'off',
// 		'@typescript-eslint/no-unused-vars': 'off',
// 		'prettier/prettier': ['error', { endOfLine: 'auto' }]
// 	}
// };

module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
	},
};
