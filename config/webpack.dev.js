var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

var parentDir = path.join(__dirname, '../');
var config = {
    output: {
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },{
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}

module.exports = config;