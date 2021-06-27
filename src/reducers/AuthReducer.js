import {  
	SEND_AUTH_DETAILS, 
	ERROR_AUTHENTICATING,
	SAVE_USER_DETAILS
 } from '../actions/AuthActions';

const initialState = {
	token: null,
	authenticating: false,
	authError: null,
	userDetails: null
};

export default function auth (state = initialState, action) {
  switch (action.type) {
	case SEND_AUTH_DETAILS:
		return {
			...state,
			authenticating: true,
			authError: null
		}
	break;
	case ERROR_AUTHENTICATING:
		return {
			...state,
			authenticating: false,
			authError: action.message
		}
	break;
	case SAVE_USER_DETAILS:
		return {
			...state,
			authenticating: false,
			authError: null,
			userDetails: action.userDetails
		}
	break;
    default:
		return state;
  }
}