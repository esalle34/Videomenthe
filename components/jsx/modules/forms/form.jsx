import React from "react";
import ReactDOM from "react-dom";
import Request from "superagent";
import { officeRegistry } from "../office-app.registry";

class Form extends React.Component{

	constructor(props){

		super(props);
		this.state = { form : props.form };
		this.validateFormInputs = this.validateFormInputs.bind(this);
		this.formControls = this.formControls.bind(this);
		this.createLabel = this.createLabel.bind(this);
	}

	validateFormInputs(inputs, store, eventList = null){

		inputs.map(function(input){

			if(eventList != null){

				eventList.map(e => input.el.addEventListener(e, ()=>{

					store.dispatch(input);
					let text = store.getState().validators.form.input;
					if(input.elgroup.nextSibling === null && typeof text != "undefined" && typeof text.errorLabel != "undefined"){
						this.createLabel(input.elgroup, text);
					}else if(input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel == "undefined"){

						input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);

					}else if(input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel != "undefined"){

						input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
						this.createLabel(input.elgroup, text);
					}


				}))

			}else{

					store.dispatch(input);
					let text = store.getState().validators.form.input;
					if(input.elgroup.nextSibling === null && typeof text != "undefined" && typeof text.errorLabel != "undefined"){
						this.createLabel(input.elgroup, text);
					}else if(input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel == "undefined"){

						input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);

					}else if(input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel != "undefined"){

						input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
						this.createLabel(input.elgroup, text);

					}

			}

		}.bind(this))

	}

	formControls(inputs, store){

		inputs.map(function(input){

			let visibility_toggle = input.elgroup.querySelector(".toggle-visibility");
			if(visibility_toggle != null){

				visibility_toggle.onclick=(e)=>{

					store.dispatch({type: "TOGGLE_INPUT_VISIBILITY", input : input.el})
					input.el.setAttribute("type", store.getState().formControls.input_type);
				}

			}

			let back = input.elgroup.querySelector(".form-back");
			if(back != null){

				back.onclick=(e)=>{

					let forwardableForm = back.parentNode;
					while(typeof forwardableForm != "undefined" && !forwardableForm.classList.contains("forwardable-form")){

						forwardableForm = forwardableForm.parentNode;
						

					}
					let currentPartForm = forwardableForm.querySelector('.current');
					currentPartForm.previousSibling.classList.add("current");
					currentPartForm.classList.remove("current");

				}

			}

			let progress = input.elgroup.querySelector(".isProgressBar");
			if(progress != null){

				let ProgressBar = officeRegistry.progressBar;

				ReactDOM.render(

						<ProgressBar className={progress.className} value={progress.value} />,
						progress.parentNode

				)

			}

		})

	}

	createLabel(element, text, className = undefined){

		var el = element.parentNode.appendChild(document.createElement("dl"));
		let dt = document.createElement("dt");
		dt.className = typeof className != "undefined" ? "label-hasError " + className : "label-hasError";
		el = el.appendChild(dt);
		if(typeof text.errorLabel != "undefined"){
			el.innerText = text.errorLabel;
		}
		

	}

	componentDidMount(){

		let form = this.state.form;
		let store = this.props.store;

		form.classList.add("loaded-form");
		store.dispatch({type : "LOAD_INPUTS", form:form});
		this.setState({form : store.getState().validators.form});
		var inputs = store.getState().validators.inputs;
		this.formControls(inputs, store);
		this.validateFormInputs(inputs, store, ['keyup', 'keydown', 'blur']);
		
		 	form.onsubmit=(e)=>{

		 		store.dispatch({type : "LOAD_INPUTS", form:form});
		 		var inputs = store.getState().validators.inputs;
		 		this.validateFormInputs(inputs, store);
		 		store.dispatch({type : "VALIDATE_FORM", form : form, inputs : inputs});

		 		if(!form.isValid){

					form.classList.add("form-hasError");

					return false;

				}else if(form.classList.contains("form-hasError")){

					form.classList.remove("form-hasError");

				}


				if(form.classList.contains("async")){

					let popin_container = document.createElement("div");
					let popin = { id : `${form.id}-popin`, key : `${form.id}-popin`, className : "form-popin" };
			 		popin_container.id = `${form.id}-popin-container`;
			 		form.parentNode.prepend(popin_container);

			 		let Popin = officeRegistry.popin;
			 		
			 		ReactDOM.render(
			 			<Popin args={popin} />,
			 			popin_container
					)
					e.preventDefault();
					Request.post(form.action)
					.send(new FormData(form))
					.then((res)=>{

						let submit = form.querySelector('.submit');
						submit = submit.parentNode;
						if(submit.nextSibling !== null){

							submit.parentNode.removeChild(submit.nextSibling);

						}
						if(res.body != null && typeof res.body == "object" && res.body.hasOwnProperty("current")){

							form.parentNode.classList.remove("current");
							document.querySelector(res.body.current).classList.add("current");

						}

						form.parentNode.removeChild(form.parentNode.firstChild);
													console.log(res.body);

						if(typeof res.body != "undefined" && res.body != null && typeof res.body.redirect != "undefined"){

							document.location.href = res.body.redirect;

						}

						},(err)=>{
						let submit = form.querySelector('.submit');
						submit = submit.parentNode;
						if(submit.nextSibling === null && typeof err.response.text != "undefined"){
							this.createLabel(submit, JSON.parse(err.response.text), "center");

						}else if(submit.nextSibling !== null){

							submit.parentNode.removeChild(submit.nextSibling);
							this.createLabel(submit, JSON.parse(err.response.text), "center");

						}
						form.parentNode.removeChild(form.parentNode.firstChild);
					});


			}

		}

	}

	render(){

		return null;

	}


}

export default Form;