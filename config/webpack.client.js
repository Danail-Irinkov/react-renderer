const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { ReactSSRClientPlugin } = require('react-server-renderer/client-plugin')
const paths = require("./paths");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	entry: {
		app: [paths.src+'/entry-client.js'],
	},
	output: {
		// publicPath: paths.public,
		publicPath: paths.build+'/static',
		path: paths.build+'/static',
		filename: `[name].[chunkhash].js`,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.REACT_ENV': '"client"',
			__SERVER__: false,
		}),
		// This plugins generates `react-ssr-client-manifest.json` in the
		// output directory.
		new ReactSSRClientPlugin({
			// path relative to your output path, default to be `react-ssr-client-manifest.json`
			filename: '../react-ssr-client-manifest.json',
		}),
	],
})
