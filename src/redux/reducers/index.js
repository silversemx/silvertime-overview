import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
import servicesReducer from './servicesReducer';

export default combineReducers ({
	auth: authReducer,
	services: servicesReducer
});
