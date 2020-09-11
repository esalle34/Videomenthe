import React from 'react';
import Html from '~/components/jsx/templates/html.jsx';
import ReactDOMServer from 'react-dom/server';
import { getContentFromRegistry, getContentsFromRegistry } from "~/components/jsx/templates/html/content/content.registry";

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const fs = require('fs');

module.exports = {

		addRegistryType : (registryMap, els)=>{

			let registry = {   react_registry : registryMap,
						   	   react_nested : els,
							   args : {
									els : []
								}  		}

			return registry;

		},

		getElementFromRegistry : (args)=>{

			return getContentFromRegistry(args);

		},

		getElementsFromRegistry : (args)=>{

			return getContentsFromRegistry(args);

		},

		addNodeSibling : (els, siblings, before = true)=>{

			let content = Object.assign(getElementFromRegistry("void"), { react_nested : [] })

			if(Array.isArray(siblings)){

				if(before){

					content.react_nested.push(els);

				};


				siblings.map(function(siblingsEl){

					if(typeof siblingsEl.react_nested != "undefined"){

						content.react_nested.push({ 
			 			react_element : siblingsEl.react_element,
			 			args : siblingsEl.args,
			 			react_nested : siblingsEl.react_nested });

					}else{

						content.react_nested.push({ 
			 			react_element : siblingsEl.react_element,
			 			args : siblingsEl.args });

					}

				})

				if(!before){

					content.react_nested.push(els);

				}

				return content;

			}

			if(before){

				content.react_nested.push(els)

			}

			if(typeof siblings.react_nested != "undefined"){

				content.react_nested.push({ 
			 	react_element : siblings.react_element,
			 	args : siblings.args,
			 	react_nested : siblings.react_nested });

			}else{

				content.react_nested.push({ 
			 	react_element : siblings.react_element,
			 	args : siblings.args });

			}

			if(!before){

				content.react_nested.push(els)

			}

			return content;

		},

		addNodeParent : (els, containers)=>{

			if(Array.isArray(containers)){

				let container = els;

					containers.map(function(containerEl){

							container = {

									react_element : containerEl.react_element,
									react_nested : container,
									args : containerEl.args

							}

							container.args.els = [];

					})

				return container;
			}

			let container = {

					react_element : containers.react_element,
					react_nested : els,
					args : containers.args
			}

			container.args.els = [];

			return container;

		},

		addLogoAsH1 : (title)=>{

			let els;
			let el = getElementFromRegistry({libelle : "a", els : title, className : "main-logo", id: title, href: "https://github.com/esalle34/videomenthe", target : "_blank"});
			
			els = addNodeParent(el, getElementFromRegistry("h1"));

			return els;

		},


		addReactRoot : (els, theme)=>{

			let el = getElementFromRegistry({libelle : "customContainer", react_element : "container", id : theme, className : null });
			let newEls = els;
			newEls = addNodeSibling(el, newEls, true);
			return newEls;

		},

		
		buildView : (route, req, res, body = null)=>{

			if(body == null){

				body = getElementFromRegistry("void");

			};


			body = addRegistryType(route.theme, addReactRoot(body, route.theme));

			const tpl = ReactDOMServer.renderToString(<Html data={route} body={body}/>)

			const htmlFile = path.resolve(global.HTML_DIR + "\\index.html");
						fs.readFile(htmlFile, "utf-8",(err, data)=>{

							if(err){

								console.error('Error-log Debug:', err);
      							return res.status(500).send('Le site à rencontrer un problème.');

							}

							return res.send(data.replace("<html></html>", `${tpl}`));

						})

			
		},


}

const addRegistryType = module.exports.addRegistryType;
const getElementFromRegistry = module.exports.getElementFromRegistry;
const addNodeSibling = module.exports.addNodeSibling;
const addNodeParent = module.exports.addNodeParent;
const addReactRoot = module.exports.addReactRoot;
const addLogoAsH1 = module.exports.addLogoAsH1;
