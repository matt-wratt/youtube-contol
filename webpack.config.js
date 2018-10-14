'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    popup: './popup.html',
    manifest: './manifest.json',
    icon: './icon.png',
    playing: './playing.png',
    application: './lib/application.js',
    background: './lib/background/index.js'
  },
  output: {
    path: __dirname + '/youtube-control',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader, // Provide css to HtmlWebPackPlugin
          },
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin('application.css'),
    new HtmlWebPackPlugin({
      template: './popup.html',
      filename: './popup.html',
      chunks: ['application']
    })
  ]
}
