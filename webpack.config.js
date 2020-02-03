const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtrackPlugin = require('mini-css-extract-plugin');
const OptmizieCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const cssExtractLoader = { loader: isProduction ? MiniCssExtrackPlugin.loader : 'style-loader' };
const cssLoader = { loader: 'css-loader', options: { sourceMap: true } };

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    devtool: 'source-map',
    entry: './index.jsx',
    output: {
        path: Path.resolve(__dirname, 'dist/'),
        filename: isProduction ? "[name].[contenthash].js" : "[name].[hash].js",
        chunkFilename: isProduction() ? "[name].[contenthash].js" : "[name].[hash].js"
    },
    plugins: [
        new webpack.ProcessPlugin(),
        new HtmlWebpackPlugin({
            title: "Workshop Subscriptions",
            template: Path.resolve(__dirname, 'templates/index.html')
        }),
        new MiniCssExtrackPlugin({
            name: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].css'
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: { chunks: 'all' }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [ 'js-loader' ]
            },
            {
                test: /\.css$/,
                use: [ cssExtractLoader, cssLoader ]
            },
            {
              test: /\.svg$/,
              use: [ "svg-inline-loader" ]
            },
            {
              test: /\.(png|jpe?g)$/,
              use: [ "file-loader" ]
            },
            {
              test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
              use: [ "file-loader" ]
            }
        ]
    },
    resolve: {
        extensions: [ ".js", ".jsx", ".css" ]
    }
};

if(!isProduction) {
    module.exports.devServer = {
        host: 'localhost',
        port: process.env.port || 3000,
        overlay: true,
        hot: true,
        compress: true
    }
}