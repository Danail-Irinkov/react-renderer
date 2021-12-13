const paths = require("./paths");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const nodeExternals = require('webpack-node-externals')
const { ReactSSRServerPlugin } = require('react-server-renderer/server-plugin')

module.exports = merge(common, {
	mode: "production",
	target: "node",
	devtool: false,
	entry: [paths.src + "/entry-server.js"],
	output: {
		path: paths.build,
		publicPath: "/",
		filename: "[name].[chunkhash].js",
		libraryTarget: "commonjs2",
	},
	externals: nodeExternals({
		allowlist: /\.s?css$/,
	}),
	plugins: [
		new webpack.DefinePlugin({
			'process.env.REACT_ENV': '"server"',
			__SERVER__: true,
		}),
		new Dotenv({
			path: "./.env.production",
		}),
		// Extracts CSS into separate files
		// Note: style-loader is for development, MiniCssExtractPlugin is for production
		new MiniCssExtractPlugin({
			filename: "styles/[name].[contenthash].css",
			chunkFilename: "[id].css",
		}),
		new ReactSSRServerPlugin(),
	],
	module: {
		rules: [],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel:  2,
				cache: true,
				sourceMap: false,
				extractComments: true,
				terserOptions: {
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
						drop_console: false,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				}
			}),
		],
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
