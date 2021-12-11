const paths = require("./paths");
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
	// Set the mode to development or production
	mode: "development",

	// Control how source maps are generated
	devtool: "inline-source-map",

	// Spin up a server for quick development
	devServer: {
		historyApiFallback: true,
		contentBase: paths.build,
		open: false,
		compress: true,
		hot: true,
		port: 4000,
		clientLogLevel: "none",
	},
	module: {
		rules: [],
	},
	plugins: [
		new Dotenv({
			path: "./.env.development",
		}),
		// new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
});
