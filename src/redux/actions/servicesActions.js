import Axios from 'axios';

import {
	SERVICES_LOADING_TRUE,
	SERVICES_LOADING_FALSE,
	ALL_SERVICES_GET,
	ALL_SERVICES_GET_ERROR,
	SERVICE_INFO_GET,
	SERVICE_INFO_ERROR
} from '../types';

export const services_loading_true = () => dispatch => {
	dispatch({
		type: SERVICES_LOADING_TRUE
	})
}

export const services_loading_false = () => dispatch => {
	dispatch({
		type: SERVICES_LOADING_FALSE
	})
}

export const get_all_services = () => dispatch => {
	dispatch(services_loading_true());
	let url = process.env.REACT_APP_SERVER_URL + '/api/resources/services?skip=0&limit=0';

	Axios.get(url)
	.then((res) => {
		dispatch({
			type: ALL_SERVICES_GET,
			payload: res.data
		});
		dispatch(services_loading_false());
	}).catch((err) => {
		dispatch({
			type: ALL_SERVICES_GET_ERROR,
			payload: { type: 'get_all_services', msg: err.message }
		});
		dispatch(services_loading_false());
	})
}

export const get_service_info = (service_id) => dispatch => {
	dispatch(services_loading_true());
	let url = process.env.REACT_APP_SERVER_URL + `/api/resources/services/${service_id}/info`;

	Axios.get(url)
	.then((res) => {
		// console.log(res.data)
		dispatch({
			type: SERVICE_INFO_GET,
			payload: res.data
		});
		dispatch(services_loading_false());
	}).catch((err) => {
		// console.log(err);
		dispatch({
			type: SERVICE_INFO_ERROR,
			payload: { type: 'service_info', msg: err.message }
		});
		dispatch(services_loading_false());
	})
}
