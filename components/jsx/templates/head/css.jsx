import React from "react";
import ReactDOM from "react-dom";
import {theme_css} from "~/theme.js";

export default class Css extends React.Component{
	

	constructor(props){

		super(props);

		this.state = { 

			css : theme_css(props.data.theme),

		}

	}

	render(){

		var view = [];

		if(typeof this.state.css != "undefined"){

			this.state.css.map(function(css_file){

				view.push(<link href={css_file} type="text/css" rel="stylesheet" />)

			});

		}

		return view;

	}


}