import Axios from 'axios';

import {
	INTERRUPTION_INFO_GET,
	INTERRUPTION_INFO_GET_ERROR
} from '../types';

export const get_interruption_info = (interruption_id) => dispatch => {
	let url = process.env.REACT_APP_SERVER_URL + `/api/state/interruptions/${interruption_id}/info`;

	Axios.get(url)
	.then((res) => {
		dispatch({
			type: INTERRUPTION_INFO_GET,
			payload: res.data
		});
	}).catch((err) => {
		dispatch({
			type: INTERRUPTION_INFO_GET_ERROR,
			payload: { type: 'interruption_info', msg: err.message }
		});
	})
}
