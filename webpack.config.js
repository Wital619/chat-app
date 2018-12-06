const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

module.exports = (env, {mode}) => {
  const config = {
    mode,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
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
                    '@babel/plugin-proposal-class-properties'
                  ]
                }
              ]
            },
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
            use: [
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
          })
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
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html'
      }),
      new ExtractTextPlugin({ 
        filename: 'styles.css', 
        allChunks: true, 
        disable: process.env.NODE_ENV !== 'production' 
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.parsed)
      })
    ],
    devServer: {
      historyApiFallback: true,
      compress: true,
      overlay: true,
      open: true,
      host: 'localhost',
      port: 3000,
      contentBase: 'public',
      proxy: {
        '/api': {
          target: 'ws://localhost:5000',
          ws: true,
          secure: false
        }
      }
    }
  };

  return config;
};
