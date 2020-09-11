//Actions
const LOAD_INPUTS = "LOAD_INPUTS";
const VALIDATE_FORM = "VALIDATE_FORM";
const VALIDATE_USERNAME = "VALIDATE_USERNAME";
const VALIDATE_EMAIL = "VALIDATE_EMAIL";
const VALIDATE_USERNAME_EMAIL = "VALIDATE_USERNAME_EMAIL";
const VALIDATE_PASSWORD = "VALIDATE_PASSWORD";
const VALIDATE_PASSWORD_SIGNUP = "VALIDATE_PASSWORD_SIGNUP";
const VALIDATE_NAME = "VALIDATE_NAME";

import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";

export { LOAD_INPUTS, VALIDATE_FORM, VALIDATE_USERNAME, VALIDATE_EMAIL, VALIDATE_USERNAME_EMAIL, VALIDATE_PASSWORD, VALIDATE_PASSWORD_SIGNUP, VALIDATE_NAME };

//Actions Creators

export function loadInputs(form){

	let newForm = Object.assign(form, { isValid : false });
	let inputs = [];

	let formId = form.id;
	form = Array.from(form);
	form.map(function(input){

		let classN = Array.from(input.classList).filter(cl=>cl.indexOf("validate")>=0);
		if(classN.length > 0){
			classN = classN[0].substring(9);
		}
		let upcase_name = (typeof classN !="undefined" && !Array.isArray(classN)) ? classN.toUpperCase() : input.name.toUpperCase();

		if(input.tagName == "INPUT"){

			inputs.push({formId : formId, el : input, elgroup : input.parentNode, type : `VALIDATE_${upcase_name}`})

		}

	})

	return {type : VALIDATE_FORM, inputs : inputs, form : newForm }


}

export function validateForm(form, inputs){

		let isValid = true;

		inputs.map(function(input){

			if(input.el.classList.contains("input-hasError")){

				isValid = false;

			}

		})

		let newForm = Object.assign(form, {isValid : isValid});

		return {type : VALIDATE_FORM, form : newForm }

}

export function validateUsername(formId, input){

	let isValid = false;
	let errorLabel;
	if(input.value.length === 0){

		errorLabel = i18n.translate("Username is required");

	}else{

		isValid = true;
		errorLabel = null;

	}

	return {type: VALIDATE_USERNAME, form : { id : formId, input : errorToggle(input, isValid, errorLabel) } }

}

export function validateEmail(formId, input){

	let isValid = false;
	let errorLabel;
	if(input.value.length === 0){

		errorLabel = i18n.translate("Email is required");

	}else if(!input.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){

		errorLabel = i18n.translate("This field requires a valid email");

	}else{
		isValid = true;
		errorLabel = null;

	}

	return {type: VALIDATE_USERNAME, form : { id : formId, input : errorToggle(input, isValid, errorLabel) } }

}

export function validatePasswordSignUp(formId, input){

	let isValid = false;
	let errorLabel;
	if(input.value.length === 0){

		errorLabel = i18n.translate("Password is required");

	}else if(!input.value.match(/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)){

		errorLabel = i18n.translate("Password must be 8 characters long, and at least have one uppercase letter, one lowercase letter, one number and one special character");

	}else{
		isValid = true;
		errorLabel = null;

	}

	return {type: VALIDATE_PASSWORD_SIGNUP, form : { id : formId, input : errorToggle(input, isValid, errorLabel) } }

}


export function validateUsernameEmail(formId, input){

	let isValid = false;
	let errorLabel;
	if(input.value.length === 0){

		errorLabel = i18n.translate("Username or email required");

	}else{

		isValid = true;
		errorLabel = null;

	}

	return {type: VALIDATE_USERNAME_EMAIL, form : { id : formId, input : errorToggle(input, isValid, errorLabel) } }

}


export function validatePassword(formId, input){

	let isValid = false;
	let errorLabel;
	if(input.value.length == 0){

		errorLabel = i18n.translate("Password is required");

	}else{

		isValid = true;
		errorLabel = null;

	}

	return {type: VALIDATE_PASSWORD, form : { id : formId, input : errorToggle(input, isValid, errorLabel) } }

}

export function validateName(formId, input){

	let isValid = false;
	let errorLabel;
	if(input.value.length === 0){

		errorLabel = i18n.translate("This field is required");

	}else if(input.value.length < 2){

		errorLabel = i18n.translateN("This field needs at least %s character", 2);

	}else{

		isValid = true;
		errorLabel = null;

	}

	return {type: VALIDATE_NAME, form : { id : formId, input : errorToggle(input, isValid, errorLabel) } }

}

function errorToggle(input, isValid, errorLabel){

	let newInput = input;

	if(!newInput.classList.contains("input-hasError") && !isValid){

		newInput.classList.add("input-hasError");
		

	}else if(newInput.classList.contains("input-hasError") && isValid){

		newInput.classList.remove("input-hasError");

	}

	if(!isValid){

		newInput.errorLabel = errorLabel;

	}else{

		newInput.errorLabel = undefined;

	}

	return Object.assign({}, newInput);

}