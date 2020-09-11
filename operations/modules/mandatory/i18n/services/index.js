import { i18nRegistry } from "../i18n.registry";

export const i18n = {

		getLang : (lang = null)=>{

			if(lang == null){

				if(typeof i18n.getDocLang() != "undefined"){

					return i18n.getDocLang();

				}else{

					return "en-EN";

				}

				
			}else{

				return lang;

			}


		},

		getDocLang : ()=>{

			let lang = typeof document != "undefined" ? document.getElementsByTagName("HTML")[0].getAttribute("lang") : undefined;

			return lang;

		},

		translate : function(string, lang = null){

			let tr_string = i18nRegistry[i18n.getLang(lang)]["default"][string];

			if(typeof tr_string == "undefined"){

				console.error("This message : '" + string + "' has no translation yet, please add it." );

				return undefined;

			}


			return tr_string;



		},

		translateN : function(string, int, lang = null){

			let tr_string = undefined;

			if(int > 0){

				tr_string = i18nRegistry[i18n.getLang(lang)]["default"][string]['other'].replace("%s", int);

			}else{

				tr_string = i18nRegistry[i18n.getLang(lang)]["default"][string]['one'].replace("%s", int);

			}

			if(typeof tr_string == "undefined"){

				console.error("This message has no translation yet, please add it.");

				return undefined;

			}


			return tr_string;



		}


} 
