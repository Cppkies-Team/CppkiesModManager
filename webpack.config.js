const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")

module.exports = {
	entry: {
		content: path.resolve("./src/index.ts"),
		popup: path.resolve("./src/popup/index.tsx"),
	},
	output: {
		filename: "[name].js",
		path: path.join(__dirname, "./dist"),
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ["ts-loader"],
			},
		],
	},
	mode: process.env.NODE_ENV,
	resolve: { extensions: [".tsx", ".ts", ".jsx", ".js", ".json"] },
	plugins: [
		new HTMLPlugin({
			template: "./src/popup/index.html",
			filename: "popup.html",
			chunks: ["popup"],
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 5500,
	},
}
