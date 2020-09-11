import React from "react";
import ReactDOM from "react-dom";
import { officeRegistry }from "~/components/jsx/modules/office-app.registry";
import { connect, Provider } from 'react-redux';
import { store } from "./modules/redux/stores/store";

class App extends React.Component{

		constructor(props){

			super(props)
			this.state = { view : "" };

		}

		render(){

			let adminforms = Array.from(document.getElementsByTagName("FORM"));
			let Form = officeRegistry["form"];

			return <React.Fragment key="app">{adminforms.map((form, i)=>{return <Form key={`form-control-${i}`} form={form} store={store} />})}</React.Fragment>;

		}

}

document.addEventListener("DOMContentLoaded", function(){

let app = document.getElementById("main");

if(app != null){

	ReactDOM.render(

		<Provider store={store}><App /></Provider>,
		app

	)

};


})

