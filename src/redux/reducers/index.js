import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
import servicesReducer from './servicesReducer';
import maintenancesReducer from './maintenancesReducer';

export default combineReducers ({
	auth: authReducer,
	services: servicesReducer,
	maintenances: maintenancesReducer
});
