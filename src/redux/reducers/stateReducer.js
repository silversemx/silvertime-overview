import {
	SAVE_SERVICE_STATE
} from '../types';

let initialState = {
	sevice_state: {}
};

export default function stateReducer (state = initialState, action) {
	switch (action.type) {
		case SAVE_SERVICE_STATE:
			return {
				...state,
				sevice_state: action.payload
			}
		default:
			return state;
	}
}
