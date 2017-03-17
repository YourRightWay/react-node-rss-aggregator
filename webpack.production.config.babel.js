import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

const ENV = process.env.NODE_ENV
const LIVE_CYCLE = process.env.npm_lifecycle_event


// =========================================
// Variable path
// =========================================
console.log(`Your lifecycle event: ${LIVE_CYCLE}`)
console.log(`Your process.env: ${ENV}`)


export default {

    entry: [
        './client/index.js', './client/style.scss'
    ],

    output: {
        path: path.join(__dirname, "./dist"),
        filename: 'bundle.js',
        publickPath: '/dist/'
    },
    
    resolve: {
        extensions: ['', '.js', '.jsx', 'es6']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplate: ['*-loader'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.js|\.jsx|\.es6$/,
                loader: ['babel'],
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'babel-preset-react', "stage-0"],
                    plugins: ["transform-decorators-legacy"]
                }
            },
            {
                test: /\.(eot|woff|ttf|png|jpg|gif)$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            },
            {
                test: /\.svg/,
                loader: 'svg-url-loader?name=/img/svg/[name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    "css!postcss!sass"
                )
            },
            {
                test:   /\.css$/,
                loader: "css!css-loader"
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("style.css", { allChunks: true }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            minimize: true,
            compress:{
                warnings: false
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessorOptions: { discardComments: {removeAll: true } }
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            },
            __DEVELOPMENT__: true,
            __PRODUCTION__ : false
        }),
        new webpack.NoErrorsPlugin()
    ]
};
