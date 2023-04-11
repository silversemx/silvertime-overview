import {
	ALL_MAINTENANCES_GET,
	ALL_MAINTENANCES_GET_ERROR
} from '../types';

const initialState = {
	all_maintenances: { count: 0, maintenances: [], past: [] },
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
		case ALL_MAINTENANCES_GET_ERROR:
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
