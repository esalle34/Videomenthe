import React from "react";
import ReactDOM from "react-dom";
import {theme_js} from "~/theme.js";

export default class Scripts extends React.Component{
	
	
	constructor(props){

		super(props);

		this.state = { 

			scripts : theme_js(props.data.theme)

		}

	}

	render(){

		var view = [];

		if(typeof this.state.scripts != "undefined"){

			this.state.scripts.map(function(script){

				view.push(<script type="text/javascript" src={script}/>)

			});

		}

		return view;

	}

}