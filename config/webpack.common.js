const paths = require("./paths");
// const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extract css to files
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer"); // help tailwindcss to work

module.exports = {
	// Where webpack looks to start building the bundle
	entry: [paths.src + "/index.js"],

	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		filename: "[name].bundle.js",
		publicPath: "/",
		// libraryTarget: "commonjs2",
	},

	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin({
			filename: "styles/[name].[contenthash].css",
			chunkFilename: "[id].[contenthash].css",
		}),

		// Copies files from target to destination folder
		new CopyWebpackPlugin([
			{
				from: paths.src + "/assets",
				to: "assets",
				globOptions: {
					ignore: ["*.DS_Store"],
				},
			},
		]
		),

		// Generates an HTML file from a template
		// Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
		new HtmlWebpackPlugin({
			title: "Project Title",
			favicon: paths.src + "/assets/icons/favicon.png",
			template: paths.public + "/index.html", // template file
			filename: "index.html", // output file
		}),
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			// { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					// ... other loaders
					{
						loader: require.resolve("babel-loader"),
						options: {
							// ... other options
							plugins: [
								// ... other plugins
								require.resolve("react-refresh/babel"),
							].filter(Boolean),
						},
					},
				],
			},
			// Styles: Inject CSS into the head with source maps
			{
				test: /\.(css|scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
					{
						loader: "postcss-loader", // postcss loader needed for tailwindcss
						options: {
							postcssOptions: {
								ident: "postcss",
								plugins: [tailwindcss, autoprefixer],
							},
						},
					},
				],
			},

			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
			{
				test: /\.m?js/,
				resolve: {
					enforceExtension: false,
				},
			},
			// Images: Copy image files to build folder
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "javascript/auto" },

			// Fonts and SVGs: Inline files
			{ test: /\.(woff(2)?|eot|ttf|otf|)$/, type: "javascript/auto" },
		],
	},
	resolve: {
		// fallback: {
		// 	"fs": require.resolve('fs'),
		// 	"util": require.resolve('util'),
		// 	"safe-buffer": require.resolve('buffer'),
		// 	"canvas": require.resolve('canvas'),
		// 	"tls": false,
		// 	"net": false,
		// 	"path": false,
		// 	"zlib": false,
		// 	"http": false,
		// 	"https": false,
		// 	"stream": false,
		// 	"crypto": false,
		// 	"crypto-browserify": false,
		// }
	},
};
