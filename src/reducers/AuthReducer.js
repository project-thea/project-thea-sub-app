import {  
	SEND_AUTH_DETAILS, 
	SAVE_USER_DETAILS,
	SET_AUTH_ERROR,
	LOGOUT,
	SET_TOKEN,
	TRY_AUTO_AUTH,
	SET_AUTO_AUTH_ERROR,
	AUTO_LOGIN_TO,
	LOGIN,
	SET_REGISTRATION_ERROR,
	REGISTER_SUBJECT,
	
	START_UPDATE_SUBJECT,
	START_DELETE_SUBJECT,
	SET_UPDATE_SUBJECT_ERROR,
	SET_DELETE_SUBJECT_ERROR
 } from '../actions/AuthActions';

const initialState = {
	token: null,
	authenticating: false,
	authError: null,
	userDetails: null,
	
	loggingIn: false,
	
	//Auto sign in
	tryingAutoAuth: false,
	autoAuthError: null,
	autoLoginTo: 'AutoLogin', //AutoLogin,Login,Track
	
	//Anonymous registration
	registeringSubject: false,
	registrationError: null,
	
	updatingSubject: false,
	deletingSubject: false,
	updateSubjectError: null,
	deletingSubjectError: null
	
};

export default function auth (state = initialState, action) {
  switch (action.type) {
	case SET_UPDATE_SUBJECT_ERROR:
		return {
			...state,
			updateSubjectError: action.message,
			updatingSubject: false
		}
	break;
	case SET_DELETE_SUBJECT_ERROR:
		return {
			...state,
			deleteSubjectError: action.message,
			deletingSubject: false
		}
	break;
	case START_UPDATE_SUBJECT:
		return {
			...state,
			updatingSubject: true		
		}
	break;
	case START_DELETE_SUBJECT:
	  return {
	    ...state,
        deletingSubject: true		
      }
	break;
	case REGISTER_SUBJECT:
		return {
			...state,
			registeringSubject: true,
			registrationError: null
		}
	break;
	case SET_REGISTRATION_ERROR:
		return {
			...state,
			registeringSubject: false,
				registrationError: action.message
		}
	break;
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
	case LOGIN:
		return {
			...state,
			loggingIn: true
		}
	break;
    default:
		return state;
  }
}