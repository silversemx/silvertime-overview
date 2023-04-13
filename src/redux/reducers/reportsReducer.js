import {
	CREATE_REPORT_SUCCES,
	CREATE_REPORT_ERROR,
	ALL_REPORTS_GET,
	ALL_REPORTS_GET_ERROR
} from '../types';

const initialState = {
	reports_loading: false,
	all_reports: { count: 0, reports: [] },
	reports_errors: {}
}

export default function reportsReducer(state = initialState, action){
	switch(action.type){
		case ALL_REPORTS_GET:
			delete state.reports_errors.all_reports
			return {
				...state,
				all_reports: {
					count: action.payload.count,
					reports: action.payload.reports
				}
			}
		case ALL_REPORTS_GET_ERROR:
			return {
				...state,
				reports_errors: {
					...state.reports_errors, 
					[`${action.payload.type}`]: { msg: action.payload.msg }
				}
			}
		default:
			return state;
	}
}
