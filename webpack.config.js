'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    popup: './popup.html',
    manifest: './manifest.json',
    icon: './icon.png',
    playing: './playing.png',
    application: './lib/application.js',
    background: './lib/background.js'
  },
  output: {
    path: __dirname + '/youtube-control',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
      { test: /\.(html|json|png)$/, loader: "file?name=[name].[ext]" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new ExtractTextPlugin("application.css")
  ]
}
