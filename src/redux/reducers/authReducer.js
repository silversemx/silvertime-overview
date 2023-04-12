import {
	SET_CURRENT_USER,
	USER_INFO_GET,
	USER_INFO_GET_ERROR
} from '../types';

import isEmpty from '../../utils/isEmpty';

let initialState = {
	isAuthenticated: false,
	user: {},
	user_info: {},
	auth_errors: {}
};

export default function authReducer (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty (action.payload),
				user: action.payload
			}
		case USER_INFO_GET:
			return {
				...state,
				user_info: action.payload
			}
		case USER_INFO_GET_ERROR:
			return {
				...state,
				auth_errors: {
					...state.auth_errors, 
					[`${action.payload.type}`]: { msg: action.payload.msg }
				}
			}
		default:
			return state;
	}
}
