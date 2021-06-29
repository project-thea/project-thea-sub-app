import {  
	SEND_AUTH_DETAILS, 
	SAVE_USER_DETAILS,
	SET_AUTH_ERROR,
	LOGOUT,
	SET_TOKEN,
	TRY_AUTO_AUTH,
	SET_AUTO_AUTH_ERROR,
	AUTO_LOGIN_TO
 } from '../actions/AuthActions';

const initialState = {
	token: null,
	authenticating: false,
	authError: null,
	userDetails: null,
	
	//Auto sign in
	tryingAutoAuth: false,
	autoAuthError: null,
	autoLoginTo: 'AutoLogin' //AutoLogin,Login,Track
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
	case SET_AUTH_ERROR:
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
	case LOGOUT:
		return initialState;
	break;
	case SET_TOKEN:
		return {
			...state,
			token: action.token
		}
	break;
	case TRY_AUTO_AUTH:
		return {
			...state,
			tryingAutoAuth: true,
			autoAuthError: null
		}
	break;
	case SET_AUTO_AUTH_ERROR:
		return {
			...state,
			autoAuthError: action.message,
			tryingAutoAuth: false
		}
	break;
	case AUTO_LOGIN_TO:
		return {
			...state,
			autoLoginTo: action.screen
		}
	break;
    default:
		return state;
  }
}