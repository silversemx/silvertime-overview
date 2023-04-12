import Axios from 'axios';

import {
	SAVE_SERVICE_STATE
} from '../types';

export const save_service_state = (service_state) => dispatch => {
	dispatch({
		type: SAVE_SERVICE_STATE,
		payload: service_state
	})
}
