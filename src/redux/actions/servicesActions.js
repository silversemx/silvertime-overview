import Axios from 'axios';

import {
	SERVICES_LOADING_TRUE,
	SERVICES_LOADING_FALSE,
	ALL_SERVICES_GET,
	ALL_SERVICES_GET_ERROR,
	SERVICE_INFO_GET,
	SERVICE_INFO_ERROR,
	ALL_SERVICE_INSTANCES_GET,
	ALL_SERVICE_INSTANCES_GET_ERROR
} from '../types';

import create_query_params from '../../utils/create_query_params';

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
		dispatch({
			type: SERVICE_INFO_GET,
			payload: res.data
		});
		dispatch(services_loading_false());
	}).catch((err) => {
		dispatch({
			type: SERVICE_INFO_ERROR,
			payload: { type: 'service_info', msg: err.message }
		});
		dispatch(services_loading_false());
	})
}

export const get_all_service_instance = (filters) => dispatch => {
	let url = process.env.REACT_APP_SERVER_URL + '/api/resources/instances?';
	let query = create_query_params(filters);
	url += query;

	Axios.get(url)
	.then((res) => {
		dispatch({
			type: ALL_SERVICE_INSTANCES_GET,
			payload: res.data
		});
	}).catch((err) => {
		dispatch({
			type: ALL_SERVICE_INSTANCES_GET_ERROR,
			payload: { type: 'all_service_instance', msg: err.message }
		});
	})
}
