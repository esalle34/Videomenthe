import {TOGGLE_INPUT_VISIBILITY , toggleInputVisibility} from "../actions/formControls";

const initialState = {};


export function formControls(state = initialState, action){

	switch(action.type){

		case TOGGLE_INPUT_VISIBILITY:
			return Object.assign({}, state, toggleInputVisibility(action.input));
		default:
			return state;

	}


}

