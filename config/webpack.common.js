const paths = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const options = {
	// sourceMap: __DEV__,
	sourceMap: false,
}
const cssLoaders = () => [
	{
		loader: 'react-style-loader',
		options: {
			manualInject : false,
			ssrId: false
		},
	},
	{
		loader: 'css-loader',
		options: {
			...options,
			esModule: false,
		},
	},
	{
		loader: 'postcss-loader',
		options,
	},
	{
		loader: 'sass-loader',
		options,
	},
]
module.exports = {
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
		// Generates an HTML file from a template
		// Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
		new HtmlWebpackPlugin({
			title: "TRC PDF",
			favicon: paths.src + "/assets/icons/favicon.png",
			template: paths.public + "/index.html", // template file
			filename: "index.html", // output file
		}),
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
			{
				test: /\.s[ac]ss$/i,
				use: cssLoaders(false),
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
			{
				test: /\.(png|jpe?g|gif|css)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 900000,
					esModule: true
					// name: 'img/[name].[hash:7].[ext]'
				}
			},
			// // Images: Copy image files to build folder
			// { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "javascript/auto" },

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
