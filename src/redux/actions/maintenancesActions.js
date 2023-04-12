import Axios from 'axios';

import {
	ALL_MAINTENANCES_GET,
	ALL_MAINTENANCES_GET_ERROR,
	MAINTENANCE_INFO_GET,
	MAINTENANCE_INFO_GET_ERROR
} from '../types';

export const get_all_maintenances = () => dispatch => {
	let url = process.env.REACT_APP_SERVER_URL + '/api/state/maintenances?skip=0&limit=10';

	Axios.get(url)
	.then((res) => {
		dispatch({
			type: ALL_MAINTENANCES_GET,
			payload: res.data
		});
	}).catch((err) => {
		dispatch({
			type: ALL_MAINTENANCES_GET_ERROR,
			payload: { type: 'get_all_maintenances', msg: err.message }
		});
	})
}

export const get_maintenance_info = (maintenance_id) => dispatch => {
	let url = process.env.REACT_APP_SERVER_URL + `/api/state/maintenances/${maintenance_id}/info`;

	Axios.get(url)
	.then((res) => {
		dispatch({
			type: MAINTENANCE_INFO_GET,
			payload: res.data
		});
	}).catch((err) => {
		dispatch({
			type: MAINTENANCE_INFO_GET_ERROR,
			payload: { type: 'maintenance_info', msg: err.message }
		});
	})
}
