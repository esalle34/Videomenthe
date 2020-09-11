//Server
//Author - Eric Salle

var http = require("http");
var path = require("path");
var express = require("express");
var routing = require(path.resolve("./routing"));
var multer = require('multer')();
var compression = require('compression');
var global = require(path.resolve("./global"))();
var i18n = require(path.resolve(global.MODULE_I18N + "\\services\\index")).i18n;

var app = express(); 
var routes = routing(app, express, i18n); 
app.use(compression());
app.use(express.json())
app.use(multer.array()); 
app.use(express.urlencoded({ extended: true }))
var server = http.createServer(app);
server.listen(global.MAIN_PORT);
