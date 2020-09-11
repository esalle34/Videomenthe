import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { getAppendFromRegistry, getFormElementFromRegistry, getFormElementsFromRegistry } from "~/components/jsx/templates/html/admin-office/forms/form.registry";

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW))

module.exports = {

		addForm : (args, els)=>{

			const form = { react_element : "form",
						   args : args,
						   react_nested : els }

			return form;

		},

		addSelectWithOptions : (args, options)=>{

			let option_array = [];

			options.map(function(option){

				option_array.push(getFormElementFromRegistry({libelle : "option", className : option.className, id : option.id, value : option.value, els : option.els}));

			})

			const select = { react_element : "select",
							 args : args,
							 react_nested : option_array

							};

			return view_service.addNodeParent(select, view_service.getElementFromRegistry({libelle : "div", className : args.containerClassName}));
		},

		addAppendButton : (icon, buttonClassName = null)=>{

			return getAppendFromRegistry({libelle : "button", className: buttonClassName, els : getAppendFromRegistry({libelle : "icon", className : icon})});

		},

		addAppendText : (icon, buttonClassName = null)=>{

			return getAppendFromRegistry({libelle : "span", className: buttonClassName, els : getAppendFromRegistry({libelle : "icon", className : icon})});

		},


		addFormInput : (args, containerClassName = null)=>{

			if(containerClassName == null){

				containerClassName = "row";

			}

			return view_service.addNodeParent(getFormElementFromRegistry(args), view_service.getElementFromRegistry({libelle : "div", className : containerClassName}));

		},

		addMultipleFormInput : (args, containerClassName = null)=>{

			if(containerClassName == null){

				containerClassName = "row";

			}

			return view_service.addNodeParent(getFormElementsFromRegistry(args), view_service.getElementFromRegistry({libelle : "div", className : containerClassName}));

		}

}

const addFormInput = (args)=>{

	return module.exports.addFormInput(args);

}