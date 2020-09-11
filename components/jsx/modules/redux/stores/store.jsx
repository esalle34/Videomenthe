import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { validators } from '../reducers/validators';
import { formControls } from '../reducers/formControls';

const validatorsReducer = combineReducers({

	validators,
	formControls

})

export const store = createStore(validatorsReducer);
