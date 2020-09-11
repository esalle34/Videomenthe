//Global - Module
//Author : Eric Salle

/* Traitements côté serveur. */

//Global variables

let INSTANCE_IS_INIT;
let LOCATION;
let MAIN_PORT = 80;
let DEFAULT_SITE_TITLE = "Vidéomenthe | Test technique";
let PROJECT_DIR = __dirname;
let HTML_DIR = __dirname + "\\views\\html\\";
let BACKEND_MODULE_DIR = "\\operations\\modules\\mandatory";
let HOME_PATH = "/";
let ASSETS = "/assets/";

//MODULE DIR

let MODULE_VIDEOMENTHE = PROJECT_DIR + BACKEND_MODULE_DIR + "\\api";
let MODULE_VIEW = PROJECT_DIR + BACKEND_MODULE_DIR + "\\views\\view_service";
let MODULE_FORM = PROJECT_DIR + BACKEND_MODULE_DIR + "\\form\\form_service";
let MODULE_I18N = PROJECT_DIR + BACKEND_MODULE_DIR + "\\i18n";

//Webpack inputs && SSR

let DEV_CSS_DIR = __dirname + "\\components\\css\\";
let DEV_JSX_DIR = __dirname + "\\components\\jsx\\";
let DEV_JSX_SSR_DIR = __dirname + "\\components\\jsx\\templates\\";

//Webpack outputs

let SERVER_CSS_DIR = __dirname + "\\dist\\css\\";
let SERVER_JS_DIR = __dirname + "\\dist\\js\\";
let SERVER_FONTS_DIR = __dirname + "\\assets\\fonts\\";
let SERVER_IMG_DIR = __dirname + "\\assets\\images\\";
let SERVER_FILES_DIR = __dirname + "\\assets\\files\\";
let WEBPACK_FONTS_OUTPUT = "../../assets/fonts";


//Webpack extensions

let WEBPACK_MODULES_DIRECTORY =  __dirname + "\\webpack-modules\\";


module.exports = function(){

		const _global = {

				MAIN_PORT : MAIN_PORT,
				DEFAULT_SITE_TITLE : DEFAULT_SITE_TITLE,
				PROJECT_DIR : PROJECT_DIR,
				HTML_DIR : HTML_DIR,
				BACKEND_MODULE_DIR : BACKEND_MODULE_DIR,
				HOME_PATH : HOME_PATH,
				ASSETS : ASSETS,
				MODULE_VIDEOMENTHE : MODULE_VIDEOMENTHE,
				MODULE_VIEW : MODULE_VIEW,
				MODULE_FORM : MODULE_FORM,
				MODULE_I18N : MODULE_I18N,
				DEV_CSS_DIR : DEV_CSS_DIR,
				DEV_JSX_DIR : DEV_JSX_DIR,
				DEV_JSX_SSR_DIR : DEV_JSX_SSR_DIR,
				SERVER_CSS_DIR : SERVER_CSS_DIR,
				SERVER_JS_DIR : SERVER_JS_DIR,
				SERVER_FONTS_DIR : SERVER_FONTS_DIR,
				SERVER_IMG_DIR : SERVER_IMG_DIR,
				SERVER_FILES_DIR : SERVER_FILES_DIR,
				WEBPACK_MODULES_DIRECTORY : WEBPACK_MODULES_DIRECTORY,
				WEBPACK_FONTS_OUTPUT : WEBPACK_FONTS_OUTPUT,

		}

		return _global;

}

