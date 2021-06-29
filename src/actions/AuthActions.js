import { getFrisbee } from '../Constants';
import AsyncStorage from '@react-native-community/async-storage';

export const SEND_AUTH_DETAILS = 'SEND_AUTH_DETAILS';
export const ERROR_AUTHENTICATING = 'ERROR_AUTHENTICATING';
export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const TRY_AUTO_AUTH = 'TRY_AUTO_AUTH';
export const SET_AUTO_AUTH_ERROR = 'SET_AUTO_AUTH_ERROR';
export const AUTO_LOGIN_TO = 'AUTO_LOGIN_TO';

export function autoLoginTo(screen){
	return {
		type: AUTO_LOGIN_TO,
		screen
	}
}

export function setAutoAuthError(message){
	return {
		type: SET_AUTO_AUTH_ERROR,
		message
	}
}

export function sendAuthDetails(){
	return {
		type: SEND_AUTH_DETAILS
	}
}

export function setAuthError(message){
	return {
		type: SET_AUTH_ERROR,
		message
	}
}

export function saveUserDetails(userDetails){
	return {
		type: SAVE_USER_DETAILS,
		userDetails
	}
}

export function setToken(){
	return {
		type: SET_TOKEN
	}
}

export function authUser(email, password){
	return async (dispatch, getState) => {
		dispatch(sendAuthDetails());
		
		try {
			const api = getFrisbee();
			const res  = await api.post('/api/login', {
				body: {
					email,
					password
				}
			});
			
			if (res.err) {
				dispatch(setAuthError('Authenticating Error. Try again!'));
				return;
			}
		
			await AsyncStorage.setItem('userToken',  res.body.access_token);
			await AsyncStorage.setItem('userDetails',  JSON.stringify(res.body.data));
			
			dispatch(saveUserDetails(res.body.data));
		}catch(e){
			dispatch(setAuthError(e.message));
		}
				
	};
}

export function logout(){
	return {
		type: LOGOUT
	}
}

export function tryAutoAuth(){
	return {
		type: TRY_AUTO_AUTH
	}
}

export function doAutoAuth(){
	return async (dispatch, getState) => {
		dispatch(tryAutoAuth());
		
		let userToken = null;
		try {
			const userToken = await AsyncStorage.getItem('userToken');
			const userDetailsStr = await AsyncStorage.getItem('userDetails');
			
			if(userToken === null){
				dispatch(autoLoginTo('Login'));
				return;
			}
			
			const userDetails = JSON.parse(userDetailsStr);
			
			//@todo: refresh user details 
			const api = getFrisbee(userToken);
			const res = await api.get('/users/' + userDetails.id);
			
			//Confirm token is still valid 
			if (res.err) {
				dispatch(setAutoAuthError('Failed to uuthenticate. Check network connectivity'));
				dispatch(autoLoginTo('Login'));
				return;
			}
			
			await AsyncStorage.setItem('userDetails',  JSON.stringify(res.body.data));
			
			dispatch(saveUserDetails(response.body.data));
			dispatch(autoLoginTo('Track'));
			
		}catch(e){
			dispatch(setAutoAuthError('Authenticating Error. Check network'));
			dispatch(autoLoginTo('AutoLogin')); //not necessary
		}
	}
}