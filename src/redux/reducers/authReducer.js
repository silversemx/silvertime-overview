import {
	SET_CURRENT_USER
} from '../types';

import isEmpty from '../../utils/isEmpty';

let initialState = {
	isAuthenticated: false,
	user: {}
};

export default function authReducer (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER: 
			delete state.auth_errors.user_set_current
			return {
				...state,
				isAuthenticated: !isEmpty (action.payload),
				user: action.payload
			}
		default:
			return state;
	}
}
