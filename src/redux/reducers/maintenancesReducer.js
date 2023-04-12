import {
	ALL_MAINTENANCES_GET,
	ALL_MAINTENANCES_GET_ERROR,
	MAINTENANCE_INFO_GET,
	MAINTENANCE_INFO_GET_ERROR,
	MAINTENANCE_STATUS_HISTORY_GET,
	MAINTENANCE_STATUS_HISTORY_GET_ERROR
} from '../types';

const initialState = {
	all_maintenances: { count: 0, maintenances: [], past: [] },
	maintenance_info: {},
	maintenance_status_history: [],
	maintenances_errors: {}
}

export default function maintenancesReducer(state = initialState, action){
	switch(action.type){
		case ALL_MAINTENANCES_GET:
			delete state.maintenances_errors.get_all_maintenances
			return {
				...state,
				all_maintenances: {
					count: action.payload.count,
					maintenances: action.payload.maintenances.filter(m => m.status !== 3 && m.status !== 4),
					past: action.payload.maintenances.filter(m => m.status === 3 && m.status === 4),
				}
			}
		case MAINTENANCE_INFO_GET:
			delete state.maintenances_errors.maintenance_info
			return {
				...state,
				maintenance_info: action.payload
			}
		case MAINTENANCE_STATUS_HISTORY_GET:
			delete state.maintenances_errors.maintenance_status_history
			return {
				...state,
				maintenance_status_history: action.payload
			}
		case ALL_MAINTENANCES_GET_ERROR:
		case MAINTENANCE_INFO_GET_ERROR:
		case MAINTENANCE_STATUS_HISTORY_GET_ERROR:
			return {
				...state,
				maintenances_errors: {
					...state.maintenances_errors, 
					[`${action.payload.type}`]: { msg: action.payload.msg }
				}
			}
		default:
			return state;
	}
}
