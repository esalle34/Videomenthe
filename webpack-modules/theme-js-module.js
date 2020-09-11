const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const global = require("../global")();

//Front-end

module.exports = function(){

  const conf = {

  name: "theme-js",
  entry: { "app" : path.resolve(global.DEV_JSX_DIR + "\\app.jsx"),
           "vendors": path.resolve(global.DEV_JSX_DIR + "\\vendors.jsx")},
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    ],
   },
   resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(global.SERVER_JS_DIR),
    publicPath: '/',
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
  devServer: {
    contentBase: './js'
  }
}

  return conf;

};