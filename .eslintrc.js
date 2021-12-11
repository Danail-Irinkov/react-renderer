module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: "babel-eslint",
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		// "prettier"
	],
	parserOptions: {
		ecmaVersion: "2017",
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		sourceType: "module",
	},
	plugins: [
		"babel", "react", "import",
		// "prettier",
		"react-hooks"],
	rules: {
		indent: [1, 'tab', {
			ignoredNodes: ['TemplateLiteral']
		}],
		'comma-dangle': ['error', {
			arrays: 'ignore',
			objects: 'ignore',
			imports: 'ignore',
			exports: 'ignore',
			functions: 'ignore'
		}],
		curly: ['error', 'multi-or-nest'],
		// allow paren-less arrow functions
		camelcase: 0,
		eqeqeq: 0,
		'no-tabs': 0,
		'no-undef': 0,
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		// custom
		'space-before-function-paren': 0,
		'object-property-newline': 0,
		'new-cap': 0,
		'no-eval': 0,
		'semi': 0,
		'no-useless-escape': 0,
		'no-implied-eval': 0,
		"import/no-duplicates": "error",
		"import/no-unresolved": "error",
		"import/named": "error",
		// "prettier/prettier": "error",
		"react/no-typos": "error",
		"react/no-unused-state": "error",
		"react/jsx-no-bind": "error",
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
		"react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"array-callback-return": "error",
		"consistent-return": "error",
		"babel/no-invalid-this": "error",
		"no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
	},
	settings: {
		react: {
			pragma: "React",
			version: "detect",
			flowVersion: "0.63.1",
		},
	},
};
