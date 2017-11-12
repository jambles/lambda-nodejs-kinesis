const path = require('path');
const dotenv = require('dotenv-webpack');
const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    module: {
        loaders: [
            {test: /.ts$/, loader: 'awesome-typescript-loader', exclude: [/node_modules/, '*.spec.ts']},
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    plugins: [
        // new webpack.IgnorePlugin(/aws-sdk/),
        new dotenv({
            path: './env.yml',
            safe: false
        })
    ],
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    }
};