import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
import servicesReducer from './servicesReducer';
import stateReducer from './stateReducer';
import maintenancesReducer from './maintenancesReducer';
import interruptionsReducer from './interruptionsReducer';
import reportsReducer from './reportsReducer';

export default combineReducers ({
	auth: authReducer,
	services: servicesReducer,
	state: stateReducer,
	maintenances: maintenancesReducer,
	interruptions: interruptionsReducer,
	reports: reportsReducer
});
