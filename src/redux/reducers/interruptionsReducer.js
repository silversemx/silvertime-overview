import {
	INTERRUPTION_INFO_GET,
	INTERRUPTION_INFO_GET_ERROR
} from '../types';

const initialState = {
	interruption_info: {},
	interruption_status_history: [],
	interruptions_errors: {}
}

export default function interruptionsReducer(state = initialState, action){
	switch(action.type){
		case INTERRUPTION_INFO_GET:
			delete state.interruptions_errors.get_all_interruptions
			return {
				...state,
				interruption_info: action.payload
			}
		case INTERRUPTION_INFO_GET_ERROR:
			return {
				...state,
				interruptions_errors: {
					...state.interruptions_errors, 
					[`${action.payload.type}`]: { msg: action.payload.msg }
				}
			}
		default:
			return state;
	}
}
