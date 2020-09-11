import React from "react";
import ReactDOM from "react-dom";
import Meta from "./head/meta";
import Css from "./head/css";
import Scripts from "./head/scripts"

export default class Head extends React.Component{
	
	constructor(props){

		super(props);
		this.state = { data : props.data };

	} 
 
	render(){ 
 
		return <head>
					<Meta data={this.state.data}/>
					<Css data={this.state.data}/>
					<Scripts data={this.state.data}/>
			   </head>;
 
	} 

 
}
