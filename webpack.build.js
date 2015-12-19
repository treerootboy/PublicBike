var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var config = {
	entry: './app/main.js',
	output: {
		path: './',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loaders: ['babel'], include: path.join(__dirname, 'app') },
			{ test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
			{ test: /\.(jpg|gif|png|eot|woff|ttf|svg|woff2)$/, loader: 'url!limit=10000' }
		]
	},
    plugins: [
        new HtmlWebpackPlugin({
          template: './app/index.html'
        })
    ]
}

module.exports = config;