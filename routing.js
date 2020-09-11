//Routing - Module
//Author - Eric Salle

const path = require('path');
const favicon = require('serve-favicon');
const global = require(path.resolve('./global'))();
const theme = require(path.resolve('./theme')).init();
const reload = require(path.resolve('./reload-conf'));
const routes = require(path.resolve('./operations/init/routes')).getAllRoutes();
const views = require(path.resolve('./operations/modules/mandatory/views/view_service'));

var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	let uri = req.headers.referer.includes(theme.PUBLIC_FILES_DIR) ? "." + theme.PUBLIC_FILES_DIR + req.headers.referer.split(theme.PUBLIC_FILES_DIR).pop() : "." + theme.PUBLIC_FILES_DIR;
    cb(null, uri)
  },
  filename: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage })


module.exports = function(app, express, i18n){

			routes.map(function(route){

				app[route.method](route.uri, upload.single("file"),  (req, res) => {

					var acceptLanguage = 'Accept-Language: ' + req.headers["accept-language"];
					acceptLanguage = acceptLanguage.split(':')[1].match(/[a-zA-Z\-]{4,10}/g) || [];
					acceptLanguage = acceptLanguage[0]
					acceptLanguage = typeof acceptLanguage != "undefined" ? acceptLanguage : i18n.getLang();

					route = Object.assign({}, route, {i18n : i18n, lang : acceptLanguage});

					if(route.callback != null){

						var c = require(path.resolve(route.filepath + "\\" + route.filename));
						if(typeof c[route.callback] != "undefined"){
							c[route.callback](route, req, res);
						}else{
							res.send(route.i18n.translate("Oups, an error occured", route.lang) + " : 500 (Internal Server)")
							console.error(route.i18n.translate("Error 500", route.lang) + " : " +  route.i18n.translate( "Did you add the callback of this route ? ", route.lang) + route.callback + " in " + route.filename );
						}
						

					}else{

						views.buildView(route, req, res);
						
					}

				})

			});

		console.log("L'app est lancée.");
	

/* PUBLIC : Répertoire visible par le client (theme.js),
   SERVER : Lu par le serveur (global.js) */

	app.use(theme.PUBLIC_JS_DIR, express.static(global.SERVER_JS_DIR));
	app.use(theme.PUBLIC_CSS_DIR, express.static(global.SERVER_CSS_DIR));
	app.use(theme.PUBLIC_FONTS_DIR, express.static(global.SERVER_FONTS_DIR));
	app.use(theme.PUBLIC_IMG_DIR, express.static(global.SERVER_IMG_DIR));
	app.use(theme.PUBLIC_FILES_DIR, express.static(global.SERVER_FILES_DIR));
	app.use(favicon(global.SERVER_IMG_DIR + "\\default\\favicon.ico"));

	return app;

} 