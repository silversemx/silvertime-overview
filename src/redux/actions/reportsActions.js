import Axios from 'axios';

import {
	CREATE_REPORT_SUCCES,
	CREATE_REPORT_ERROR,
	ALL_REPORTS_GET,
	ALL_REPORTS_GET_ERROR
} from '../types';

export const create_report = (reportInfo, closeModalRef) => dispatch => {
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
	formData.append('title', reportInfo.title);
	formData.append('text', JSON.stringify(reportInfo.text['ops']));
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

		setTimeout(() => {
			closeModalRef.current.click();
			dispatch(get_all_reports());
		}, 1000);
	}).catch((err) => {
		dispatch({
			type: CREATE_REPORT_ERROR,
			payload: { type: 'create_report', msg: err.message }
		});
	})
}

export const get_all_reports = () => dispatch => {
	let url = process.env.REACT_APP_SERVER_URL + '/api/state/reports?skip=0&limit=0';

	Axios.get(url)
	.then((res) => {
		dispatch({
			type: ALL_REPORTS_GET,
			payload: res.data
		});
	}).catch((err) => {
		dispatch({
			type: ALL_REPORTS_GET_ERROR,
			payload: { type: 'all_reports', msg: err.message }
		});
	})
}
