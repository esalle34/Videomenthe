const webpack = require('webpack');
const path = require('path');
const global = require("../global")();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


//Theming - css basé sur sass

module.exports = function(){

  const conf = {

  name : "theme-css",
  entry: { "app" : path.resolve(global.DEV_CSS_DIR + "\\app.sass"),
           "vendors" : path.resolve(global.DEV_CSS_DIR + "\\vendors.sass")},
  plugins: [new FixStyleOnlyEntriesPlugin(), new OptimizeCSSAssetsPlugin({}), new MiniCssExtractPlugin({filename : '[name].min.css', chunkFilename: '[id].css'})],
  module: {
    rules: [
    { 
      test: /\.s[ac]ss$/i,
      use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
              sourceMap: false,
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
    },
    {  test: /\.(otf|ttf|eot|svg|gif|png|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
     use: [{
       loader: 'file-loader',
       options : {

        name : "[name].[ext]",
        outputPath: global.WEBPACK_FONTS_OUTPUT,
        publicPath: global.WEBPACK_FONTS_OUTPUT,

       }
     }]}
     ]
   },
  output: {
    path: path.resolve(global.SERVER_CSS_DIR),
    publicPath: "/"
  },
}

  return conf;

};
