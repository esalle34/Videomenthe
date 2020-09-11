//Configuation du reload
//Author - Eric Salle

var path = require("path");
var global = require(path.resolve('./global.js'))();
var nodemon = require('nodemon');
const livereload = require("livereload");
const {exec} = require('child_process');

module.exports = function(){

	const _instance = {

		init : function (){

		var liveReloadServer = livereload.createServer();
		liveReloadServer.watch(__dirname + "\\");

		nodemon({
  			script: __dirname + '\\server.js',
 	 		ignore: [ '*.min.js' ],
 	 		ext: 'sass jsx js json',  
		});
 
		global.INSTANCE_IS_INIT = !global.INSTANCE_IS_INIT;

	}, 

		isInit : function(){

			return global.INSTANCE_IS_INIT;

		}, 
 
		startlisteners : function(){
  
			nodemon.on('start', function () {
  				console.log("L'app est en cours de lancement."); 
			}).on('quit', function () {
  				console.log("L'app va s'arrêter.");
  				process.exit();
			}).on('restart', function (files) { 
				let css_proc = "";
				let js_proc = "";
				let global_proc = "";
				let cmd;
				files.map(function(file){

						switch(file.substr(file.lastIndexOf('.') + 1)){
							
							case "jsx":
							js_proc = "theme-js";
							break;
							case "sass":
							css_proc = "theme-css";
							break;

						}

						if((css_proc && js_proc) != ""){

							cmd = `npm run ${process.env.NODE_ENV}-process`;
							global_proc = "all-config";

						}else if((css_proc || js_proc) != ""){

							cmd = `webpack --mode ${process.env.NODE_ENV} --config-name ${css_proc} ${js_proc}`;  

						}

				})

				if(typeof cmd != "undefined"){
						var process_cmd = exec(`${cmd}`, function(error, stdout, stderr){ console.log(stdout + stderr); });
						console.log(`Traitement des pre-process en cours en mode : ${global_proc} ${process.env.NODE_ENV} ${js_proc} ${css_proc}`);
				}
  				console.log('App en cours de redémarrage suite au traitement de : ', files);   
			});

		} 
 
	};


	return _instance;

}
