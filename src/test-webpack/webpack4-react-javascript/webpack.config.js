const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const DevConfig = require('./config.dev')
const ProdConfig = require('./config.prod')

const output = 'dist';
const port = 3009;
const entry = path.resolve(__dirname, 'src/index.js');
const mockjs = path.resolve(__dirname, 'mock/index.js');

module.exports = (env)=>{
    return {
        mode: env.development ? 'development' : 'production',
        entry: {
            main: env.development ? [mockjs, entry] : entry,
        },
        output: {
            path: path.resolve(__dirname, output),
            filename: '[name].[hash:8].build.js'
        },
        resolve: {
          alias:{
              src: path.resolve(__dirname, 'src'),
              pages: path.resolve(__dirname, 'src/pages'),
              utils: path.resolve(__dirname, 'src/utils'),
              components: path.resolve(__dirname, 'src/components'),
          },
          extensions: ['.js', '.jsx'],
        },

        module: {
            rules: [
                {
                    test: /\.js|jsx$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
                {
                  test: /\.css$/,
                  use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                  ]
                }
            ]
        },
        plugins: [
            !env.development && new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                templateParameters: {
                    CONFIG: JSON.stringify(env.development ? DevConfig : ProdConfig),
                    DEVELOPMENT: JSON.stringify(Boolean(env.development))
                }
            }),
            new webpack.DefinePlugin({
                CONFIG: JSON.stringify(env.development ? DevConfig : ProdConfig),
                DEVELOPMENT: JSON.stringify(Boolean(env.development))
            }),

            new CopyWebpackPlugin({
              patterns: [
                {
                  from: path.resolve(__dirname, 'public/favicon.ico'),
                  to: '',
                }
              ]
            }),

            new MiniCssExtractPlugin({
              filename: '[name].[contenthash:8].css',
              ignoreOrder: true,
            }),

            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false,
              logLevel: 'info',
            })

        ].filter(Boolean),



        devtool: env.development ? 'source-map' : '',

        devServer: {
            port,
            contentBase: path.join(__dirname, output),
            hot: true,
            inline: false,
            historyApiFallback: true,
            compress: true,
        }
    }
}
