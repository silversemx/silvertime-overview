import Axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

import {
	SET_CURRENT_USER,
	USER_INFO_GET,
	USER_INFO_GET_ERROR
} from '../types';

import isEmpty from '../../utils/isEmpty';

const cookies = new Cookies ();

// Set logged user
export const user_set_current = (decoded) => dispatch => {
	sessionStorage.setItem('isAuthenticated', !isEmpty(decoded));

	dispatch({
		type: SET_CURRENT_USER,
		payload: decoded
	})
}

// Log user out
export const auth_token_remove = () => dispatch => {
	// const cookies = new Cookies ();
	process.env.REACT_APP_RUNTIME === 'Production' || process.env.REACT_APP_RUNTIME === 'Test' ?
		cookies.remove (process.env.REACT_APP_JWT_KEY, {
			path: '/', 
			domain: '.time.silverse.mx'
		}) :
		cookies.remove (process.env.REACT_APP_JWT_KEY, {
			path: '/', 
			domain: '.localhost.com'
		});
	
	// remove auth header for future requests
	localStorage.clear();
	sessionStorage.clear();
	window.location.href = process.env.REACT_APP_LOGIN;
	auth_token_set (null);
	dispatch (user_set_current ({}));
	// dispatch (alert_set ('You have logged out!', 'success'));
};

// Check for user token
export const user_token_check = (store) => {
	// const cookies = new Cookies ();
	let jwt = cookies.get (process.env.REACT_APP_JWT_KEY);

	// localStorage.jwtToken
	if (jwt) {
		// check for expired token
		let decoded = jwt_decode (jwt);
		let currentTime = Date.now () / 1000;
		if (decoded.exp < currentTime) {
			// logout the user
			store.dispatch (auth_token_remove ());
			// store.dispatch (profile_clear_current ());
			window.location.href = process.env.REACT_APP_LOGIN;
		}
		else {
			auth_token_set (jwt);           // set auth token header auth
			store.dispatch (user_set_current (decoded));
		}
	}
}

// Set auth token for each request
const auth_token_set = token => {
	// Apply to every request
	if (token) Axios.defaults.headers.common['Authorization'] = token;
	else delete Axios.defaults.headers.common['Authorization'];
};


export const get_user_info = (user_id) => dispatch => {
	let url = process.env.REACT_APP_SERVER_URL + `/api/users/${user_id}/info`;

	Axios.get(url)
	.then((res) => {
		dispatch({
			type: USER_INFO_GET,
			payload: res.data
		});
	}).catch((err) => {
		dispatch({
			type: USER_INFO_GET_ERROR,
			payload: { type: 'user_info', msg: err.message }
		});
	})
}
