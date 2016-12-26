var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    plugins: [
        new ExtractTextPlugin("../css/[name].css", {
            disable: false,
            allChunks: true
        })
    ],
    entry: {
        geomap : './src/js/geomap.js'
    },
    output: {
        path: __dirname+'/build/js',
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader?sourceMap")},
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.js$/, loader: 'babel-loader!jsx-loader?harmony' },
            { test: /\.svg$/, loader: "file-loader?prefix=font/" },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
};