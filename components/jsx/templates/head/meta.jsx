import React from "react";
import ReactDOM from "react-dom";
import { theme_config_default, theme_config } from "~/theme.js";

export default class Meta extends React.Component{
	

	constructor(props){


		super(props);
		this.state = { data : props.data, custom : theme_config(), default : theme_config_default()};


	}

	render(){

		return <><title>{this.state.data.title || this.state.default.title }</title>
				{(this.state.custom.charset != undefined) && <meta charSet={this.state.custom.charset} />}
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" /> </>;


	}


}