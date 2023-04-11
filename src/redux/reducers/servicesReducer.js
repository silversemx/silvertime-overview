import {
	SERVICES_LOADING_TRUE,
	SERVICES_LOADING_FALSE,
	ALL_SERVICES_GET,
	ALL_SERVICES_GET_ERROR,
	SERVICE_INFO_GET,
	SERVICE_INFO_ERROR
} from '../types';

const initialState = {
	services_loading: false,
	all_services: { count: 0, services: [] },
	service_info: {},
	services_errors: {}
}

export default function servicesReducer(state = initialState, action){
	switch(action.type){
		case SERVICES_LOADING_TRUE:
			return {
				...state,
				services_loading: true
			}
		case SERVICES_LOADING_FALSE:
			return {
				...state,
				services_loading: false
			}
		case ALL_SERVICES_GET:
			delete state.services_errors.get_all_services
			return {
				...state,
				all_services: {
					count: action.payload.count,
					services: action.payload.services.sort((a, b) => a.name.localeCompare(b.name))
				}
			}
		case SERVICE_INFO_GET:
			delete state.services_errors.service_info
			return {
				...state,
				service_info: action.payload
			}
		case ALL_SERVICES_GET_ERROR:
		case SERVICE_INFO_ERROR:
			return {
				...state,
				services_errors: {
					...state.services_errors, 
					[`${action.payload.type}`]: { msg: action.payload.msg }
				}
			}
		default:
			return state;
	}
}
