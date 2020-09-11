import {LOAD_INPUTS, loadInputs} from "../actions/validators";
import {VALIDATE_FORM, validateForm} from "../actions/validators";
import {VALIDATE_USERNAME, validateUsername} from "../actions/validators";
import {VALIDATE_EMAIL, validateEmail} from "../actions/validators";
import {VALIDATE_USERNAME_EMAIL, validateUsernameEmail} from "../actions/validators";
import {VALIDATE_PASSWORD, validatePassword} from "../actions/validators";
import {VALIDATE_PASSWORD_SIGNUP, validatePasswordSignUp} from "../actions/validators";
import {VALIDATE_NAME, validateName} from "../actions/validators";

const initialState = {};


export function validators(state = initialState, action){

	switch(action.type){

		case LOAD_INPUTS:
			return Object.assign({}, state, loadInputs(action.form));
		case VALIDATE_FORM:
			return Object.assign({}, state, validateForm(action.form, action.inputs));
		case VALIDATE_EMAIL:
			return Object.assign({}, state, validateEmail(action.formId, action.el));
		case VALIDATE_USERNAME_EMAIL:
			return Object.assign({}, state, validateUsernameEmail(action.formId, action.el));
		case VALIDATE_USERNAME:
			return Object.assign({}, state, validateUsername(action.formId, action.el));
		case VALIDATE_PASSWORD:
			return Object.assign({}, state, validatePassword(action.formId, action.el));
		case VALIDATE_PASSWORD_SIGNUP:
			return Object.assign({}, state, validatePasswordSignUp(action.formId, action.el));
		case VALIDATE_NAME:
			return Object.assign({}, state, validateName(action.formId, action.el));
		default:
			return Object.assign({}, state, { form : { input : undefined } });

	}


}

