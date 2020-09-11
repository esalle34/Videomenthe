import Void from "./void";
import Header from "./header";
import Container from "./container";
import Row from "./row";
import Column from "./column";
import Div from "./div";
import Image from "./image";
import H1 from "./h1";
import A from "./a";
import P from "./p";
import Span from "./span";
import Button from "./button";
import Icon from "./icon";

export const content = {

		void : Void,
		header : Header,
		container : Container,
		row : Row,
		column : Column,
		div : Div,
		image : Image,
		h1 : H1,
		a : A,
		p : P,
		span : Span,
		button : Button,
		icon : Icon

}

const containerTypes = {

	void : (args)=> {

		return { react_element : "void",
				 name : "void element",
				 args : {

				 	 key : args.key,
					 els : []

				}
			}

	},

	container : (args)=>{

		return { 
				react_element : "container",
				name : "container",
				args : {
					id : (typeof args.id != "undefined" ? args.id : null),
					key : args.key,
					className : args.className
				}
		}
	},

	row : (args)=>{

		return { react_element : "row",
				 name : "row",
				 args : {
					id : (typeof args.id != "undefined" ? args.id : null),
				 	key : args.key,
				 	className : args.className
				}
		}
	},


	column : (args)=>{

		return {

			react_element : "column",
			name : "column",
			args : {
				id : (typeof args.id != "undefined" ? args.id : null),
				className : args.className,
				key : args.key
			}
		}

	},

	h1 : (args)=>{

		return {

			react_element : "h1",
			name : "h1",
			args : {

				id : (typeof args.id != "undefined" ? args.id : null),
				className : args.className,
				els : args.els,
				key : args.key
			}

		}

	},

	image : (args)=>{

		return {

			react_element : "image",
			name : "image",
			args : {

				id : (typeof args.id != "undefined" ? args.id : null),
				className : args.className,
				style : args.style,
				src : args.src,
				els : args.els,
				key : args.key

			}

		}

	},

	a : (args)=>{

		return {

			react_element : "a",
			name : "a",
			args : {

				id : (typeof args.id != "undefined" ? args.id : null),
				className : args.className,
				style : args.style,
				href : args.href,
				target : args.target,
				els : args.els,
				key : args.key

			}

		}

	},

	p : (args)=>{

		return {

			react_element : "p",
			name : "p",
			args : {

				id : (typeof args.id != "undefined" ? args.id : null),
				className : args.className,
				style : args.style,
				els : args.els,
				key : args.key

			}

		}

	},

	div : (args)=>{

		return {

			react_element : "div",
			name : "div",
			args : {

				id : (typeof args.id != "undefined" ? args.id : null),
				className : args.className,
				style : args.style,
				els : args.els,
				key : args.key

			}

		}

	},

	button : (args)=>{

		return {

			react_element : "button",
			name : "button",
			args : {

				id : (typeof args.id != "undefined" ? args.id : null),
				className : args.className,
				style : args.style,
				els : args.els,
				key : args.key

			}

		}

	},

	icon : (args)=>{

		return {

			react_element : "icon",
			name : "icon",
			args : {

				id : (typeof args.id != "undefined" ? args.id : null),
				className : args.className,
				style : args.style,
				els : args.els,
				key : args.key

			}

		}

	},

	customContainer : (args)=>{

		return {

			react_element : args.react_element,
			name : args.name,
			args : {
				id : args.id,
				className : args.className,
				key : args.key
			}

		}

	},


}

export const getContentFromRegistry = (args)=>{

	if(typeof args != "undefined"){

		let newArgs;

		if(typeof args != "object"){

			newArgs = Object.assign({}, {key : "key-" + args + "-" + (typeof args.key != "undefined" ? args.key : 0)});

			return containerTypes[args](newArgs);

		}else{

			newArgs = Object.assign({}, args, {key : "key-" + args.libelle + "-" + (typeof args.key != "undefined" ? args.key : 0)});
			return containerTypes[args.libelle](newArgs);

		}

	}


}


export const getContentsFromRegistry = (types)=>{

	let container_array = [];
	let key = 0;

	types.map(function(type){

		let newType = typeof type == "object" ? Object.assign({}, type, {key : key}) : Object.assign({}, {libelle : type}, {key : key});
		container_array.push(getContentFromRegistry(newType));
		key++;

	});

	return container_array;

}