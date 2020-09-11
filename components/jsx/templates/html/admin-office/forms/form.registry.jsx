import React from "react";
import Input from "./input";
import Form from "./form";
import Select from "./select";
import Option from "./option";
import InputGroupAddOns from "./inputGroupAddOns";

export const forms = {

		form : Form,
		input : Input,
		select : Select,
		option : Option

}

const DEFAULT_FORM_LABEL = "form_submit";
const DEFAULT_FORM_VALUE = "Envoyer";

const inputTypes = {	

		username :(args)=>{ 

			return { react_element : "input",
					 args : { 
						 id : args.key,
						 key : "key-" + args.key,
						 name : typeof args.name != "undefined" ? args.name : "username_email",
						 type : "text",
						 groupClassName : args.groupClassName,
						 className : "form-control form-input-text " + (typeof args.className != "undefined" ? args.className : "validate_username_email"),
						 prepend : args.prepend,
						 append : args.append,
						 placeholder : args.placeholder,
						 value : null
					}
			}

		},
		password : (args)=>{	
			
			return{

				react_element : "input",			
					args : { 

						id : args.key,
						key: "key-" + args.key,
						name : typeof args.name != "undefined" ? args.name : "password",
						type : "password",
						groupClassName : args.groupClassName,
						className : "form-control form-input-text " + (typeof args.className != "undefined" ? args.className : "validate_password"),
						placeholder : args.placeholder,
						prepend : args.prepend,
						append : args.append,
						value : null

					}

			}

		},
		select : (args)=>{

			return{

				react_element : "select",			
					args : { 

						id : args.key,
						key: "key-" + args.key,
						name : args.name,
						className : args.className,
						placeholder : args.placeholder,
						value : typeof args.value != "undefined" ? args.value : undefined,
						els : args.els

					}

			}

		},
		option : (args)=>{

			return{

				react_element : "option",
				args : {

					id : args.key,
					key: "key-" + args.key,
					className : args.className,
					value : typeof args.value != "undefined" ? args.value : undefined,
					els : args.els


				}

			}

		},
		text : (args)=>{

			return{

				react_element : "input",			
					args : { 

						id : args.key,
						key: "key-" + args.key,
						name : args.name,
						type : args.type,
						groupClassName : args.groupClassName,
						className : args.className,
						labelClassName : args.labelClassName,
						placeholder : args.placeholder,
						append : args.append,
						prepend : args.prepend,
						value : typeof args.value != "undefined" ? args.value : null,
						label : args.label

					}

			}

		},
		validate : (args)=>{

			return { 
				 	 react_element : "input",
				 	 args : {

				 	 	id : addFormLabel(args.key),
					 	key : "submit",
					 	name : addFormLabel(args.key),
					 	type : typeof args.type != "undefined" ? args.type : "submit",
					 	groupClassName : args.groupClassName,
					 	className : typeof args.className != "undefined" ? args.className : "submit form-input-submit next btn btn-primary",
					 	value : addValue(args.value)

				 	 }

			};

		},
		custom : (args)=>{

			return { 
					 react_element : args.react_element,
					 args : {

					 	id : args.id,
					 	key : args.key,
					 	name : args.name,
					 	type : args.type,
					 	groupClassName : args.groupClassName,
						className : args.className,
						placeholder : args.placeholder,
					 	value : args.value

					 }
					 
			};

		}
							 
				
}

const addFormLabel = (key)=>{

		if(typeof key == "undefined" || key == null ){

			return DEFAULT_FORM_LABEL;

		}else{

			return DEFAULT_FORM_LABEL + key;

		}

}

const addValue = (value)=>{

		if(typeof value == "undefined" || value == null ){

			return DEFAULT_FORM_VALUE;

		}else{

			return value;

		}

}

export const getFormElementFromRegistry = (args)=>{

	if(typeof args != "undefined"){

		let newArgs;

		if(typeof args != "object"){

			newArgs = Object.assign({}, {key : args + "-" + (typeof args.key != "undefined" ? args.key : 0)});

			return inputTypes[args](newArgs);

		}else{

			newArgs = Object.assign({}, args, {key : "_" + args.libelle + "_" + (typeof args.key != "undefined" ? args.key : 0)});
			return inputTypes[args.libelle](newArgs);

		}

	}


}

export const getAppendFromRegistry = (args)=>{

	if(typeof args != "undefined"){

		let newArgs;

		if(typeof args != "object"){

			newArgs = Object.assign({}, {key : args + "-" + (typeof args.key != "undefined" ? args.key : 0)});

			return InputGroupAddOns.append[args](newArgs);

		}else{

			newArgs = Object.assign({}, args, {key : "_" + args.libelle + "_" + (typeof args.key != "undefined" ? args.key : 0)});
			return InputGroupAddOns.append[args.libelle](newArgs);

		}

	}


}

export const getFormElementsFromRegistry = (types)=>{

	let container_array = [];
	let key = 0;

	types.map(function(type){

		let newType = typeof type == "object" ? Object.assign({}, type, {key : key}) : Object.assign({}, {libelle : type}, {key : key});
		container_array.push(getFormElementFromRegistry(newType));
		key++;

	});

	return container_array;

}