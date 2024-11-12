const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	entry: "./index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.html$/i,
	// 			loader: "html-loader",
	// 		},
	// 	],
	// },
	devServer: {
		port: 5050,
	},
};
