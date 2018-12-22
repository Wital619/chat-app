const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

module.exports = (env, {mode}) => {
  const devMode = mode !== 'production';
  const config = {
    mode,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                {
                  plugins: [
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-transform-runtime'
                  ]
                }
              ]
            },
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                camelCase: true,
                localIdentName: '[local]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9'
                    ],
                    flexbox: 'no-2009'
                  })
                ]
              }
            },
          'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          exclude: /(node_modules)/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        },
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: './public/favicon.ico', to: './' },
        { from: './public/manifest.json', to: './' },
      ]),
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.parsed)
      }),
      new WorkboxPlugin.GenerateSW({
        swDest: 'service-worker.js',
        clientsClaim: true,
        skipWaiting: true,
      })
    ],
    devServer: {
      historyApiFallback: true,
      compress: true,
      overlay: true,
      open: true,
      host: 'localhost',
      port: 3000,
      contentBase: 'build',
      proxy: {
        '/api': {
          target: 'ws://localhost:5000',
          secure: false
        }
      }
    }
  };

  return config;
};
