import React from "react";
import ReactDOM from "react-dom";
import Head from "./head";
import { html } from "./html/html.registry";

export default class Html extends React.Component{
	
		
		constructor(props){


			super(props);

			
			this.buildBody = this.buildBody.bind(this);
			this.state = { data : props.data, els : this.buildBody(this.props.body)};

			
		}

		buildBody(data, lastData = null, registry = null){

				if(typeof data != "undefined" && data != null){

					if(registry == null){

						registry = data.react_registry;
						if(typeof registry == "undefined" || registry == null){

							throw "registry not set in data";

						}

					}

					if(data.hasOwnProperty("react_nested") || data.hasOwnProperty("react_registry")){

						data.args.els = this.buildBody(data.react_nested, data, registry);
						let el;
						if(!data.hasOwnProperty("react_registry")){
							if(data.hasOwnProperty("args")){
								el = html[registry][data.react_element](data.args);
							}else{
								el = html[registry][data.react_element];
							}

						}else{

							el = data.args.els;

						}
						return el;
					}
					if(lastData != "undefined" && lastData != null){


						if(Array.isArray(data)){

							let container = [];

							data.map(function(elem){

								if(elem.hasOwnProperty("react_nested")){

									elem.args.els = this.buildBody(elem.react_nested, elem, registry);

								}
								let el;
								if(elem.hasOwnProperty("args")){
									el = html[registry][elem.react_element](elem.args);
								}else{
									el = html[registry][elem.react_element];
								}
								container.push(el);

							}.bind(this))

							return container;

						}else if(data.hasOwnProperty("react_element")){

							let el;
							if(data.hasOwnProperty("args")){
								el = html[registry][data.react_element](data.args);
							}else{
								el = html[registry][data.react_element];
							}
							return el;

						}


					}

				}


		}

		render(){

			return <html rootid={this.state.data.root_id} lang={this.state.data.lang}>
						<Head data={this.state.data} />
						<body>{ this.props.body && this.state.els }</body>
				   </html>;


		}


}
