//Webpack Config
//Author - Eric Salle

/* Centralisation des child modules */

const path = require("path");
const global = require(path.resolve("./global"))();
const themeJSConfig = require(path.resolve(global.WEBPACK_MODULES_DIRECTORY + "\\theme-js-module.js"));
const themeCSSConfig = require(path.resolve(global.WEBPACK_MODULES_DIRECTORY + "\\theme-css-module.js"));

module.exports = [

  themeJSConfig(),
  themeCSSConfig() 


]