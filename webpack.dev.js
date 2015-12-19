var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var config = {
	entry: [ 
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./app/main.js'
	],
    devServer: {
    	proxy: {
    		'/scamp/*': {
    			target: 'http://lhcs.shencom.cn/',
                secure: false,
            }
    	},
    	 headers: { "X-Custom-Header": "yes" },
    },
	output: {
		path: './',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loaders: ['babel'], include: path.join(__dirname, 'app') },
			{ test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
			{ test: /\.(eot|woff|ttf|svg|woff2)$/, loader: 'url' }
		]
	},
    plugins: [
        new HtmlWebpackPlugin({
        	inject: true,
          	template: './app/index.html'
        })
    ]
}

module.exports = config;