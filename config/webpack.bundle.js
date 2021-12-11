const paths = require("./paths");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const nodeExternals = require('webpack-node-externals')
const { ReactSSRServerPlugin } = require('react-server-renderer/server-plugin')

module.exports = merge(common, {
	mode: "production",
	target: "node",
	devtool: false,
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
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new TerserPlugin(),
      new CssMinimizerPlugin(),
		],
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
