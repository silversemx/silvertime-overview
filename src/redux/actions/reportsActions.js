import Axios from 'axios';

import {
	CREATE_REPORT_SUCCES,
	CREATE_REPORT_ERROR
} from '../types';

export const create_report = (reportInfo) => dispatch => {
	let url = process.env.REACT_APP_SERVER_URL + '/api/state/reports/create';

	const formData = new FormData();
	formData.append('priority', reportInfo.priority)
	formData.append('scope', reportInfo.scope)

	if (reportInfo.scope === 2 || reportInfo.scope === 3) {
		formData.append('service', reportInfo.service)
	}

	if (reportInfo.scope === 3 && reportInfo.instance) {
		formData.append('instance', reportInfo.instance)
	}

	formData.append('type', reportInfo.type);
	formData.append('text', JSON.stringify(reportInfo.text));
	formData.append('image', reportInfo.image);

	Axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
	})
	.then((res) => {
		dispatch({
			type: CREATE_REPORT_SUCCES,
			payload: res.data
		});
	}).catch((err) => {
		dispatch({
			type: CREATE_REPORT_ERROR,
			payload: { type: 'create_report', msg: err.message }
		});
	})
}
