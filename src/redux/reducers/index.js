import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
import servicesReducer from './servicesReducer';
import stateReducer from './stateReducer';
import maintenancesReducer from './maintenancesReducer';

export default combineReducers ({
	auth: authReducer,
	services: servicesReducer,
	state: stateReducer,
	maintenances: maintenancesReducer
});
