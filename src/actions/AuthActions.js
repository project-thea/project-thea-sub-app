import { getFrisbee } from '../Constants';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

export const SEND_AUTH_DETAILS = 'SEND_AUTH_DETAILS';
export const ERROR_AUTHENTICATING = 'ERROR_AUTHENTICATING';
export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const TRY_AUTO_AUTH = 'TRY_AUTO_AUTH';
export const SET_AUTO_AUTH_ERROR = 'SET_AUTO_AUTH_ERROR';
export const AUTO_LOGIN_TO = 'AUTO_LOGIN_TO';
export const START_DELETE_SUBJECT = 'START_DELETE_SUBJECT';
export const START_UPDATE_SUBJECT = 'START_UPDATE_SUBJECT';
export const SET_UPDATE_SUBJECT_ERROR = 'SET_UPDATE_SUBJECT_ERROR';
export const SET_DELETE_SUBJECT_ERROR = 'SET_DELETE_SUBJECT_ERROR';


/*
* Register anonymous subject
*/
export const REGISTER_ANON_SUBJECT = 'REGISTER_ANON_SUBJECT';
export const SET_REGISTRATION_ERROR  = 'SET_REGISTRATION_ERROR';
export const REGISTER_SUBJECT = 'REGISTER_SUBJECT';

export const LOGIN = 'LOGIN';

export function setUpdateSubjectError(message){
  return {
	type: SET_UPDATE_SUBJECT_ERROR,
	message
  }	
}

export function setDeleteSubjectError(message){
  return {
	type: SET_DELETE_SUBJECT_ERROR,
	message
  }	
}

/**
* Marks start of the update process
*/
export function startUpdateSubject(){
	return {
		type: START_UPDATE_SUBJECT
	}
}

/**
* Mark start of the delete subject process 
*/
export function startDeleteSubject(){
	return {
		type: START_DELETE_SUBJECT
	}
}

export function login(){
	return {
		type: LOGIN
	}
}

export function registeringSubject(){
	return {
		type: REGISTER_SUBJECT
	}
}

export function setRegistrationError(message){
	return {
		type: SET_REGISTRATION_ERROR,
		message
	}
}

export function loginAnonymously(phone){
  return async (dispatch, getState) => {
  	dispatch(login());
  	
  	//const uuid = require('react-native-uuid');
  	const unique_id = uuid.v4().toUpperCase();
	
  	await AsyncStorage.setItem('userDetails',  
  	JSON.stringify({
  	  phone,
  	  unique_id
  	}));
  	
  	dispatch(saveUserDetails({
  	  phone,
  	  unique_id
  	}))
  	
  }
}

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


export function deleteAccount(callBack){
  return async (dispatch, getState) => {
  	dispatch(logout());
	if(typeof callBack === 'function') callBack();
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


export function registerSujbect({phone, firstname, lastname, email, nationality, dateOfBirth, nextOfKin, nextOfKinPhone, idNumber, idType}){
  return async (dispatch, getState) => {
  	dispatch(registeringSubject());
  
  	try {
  	  const unique_id = uuid.v4();
  	  const api = getFrisbee();
  	  const res  = await api.post('/api/subjects/anon', {
  	  	body: {
  	  		phone,
			unique_id,
  	  		first_name: firstname ? firstname : 'Anonymous',
			last_name: lastname ? lastname: 'Anonymous',
			email: email ? email : unique_id + '@project-thea.org',
			nationality: nationality ? nationality : 'Anonymous',
			date_of_birth: dateOfBirth ? dateOfBirth : '1971-01-01',
			next_of_kin: nextOfKin ? nextOfKin : 'Anonymous',
			next_of_kin_phone: nextOfKinPhone ? nextOfKinPhone : '0123456789',
			id_number: idNumber ? idNumber : unique_id,
			id_type: idType ? idType : 'unique_id'
  	  	}
  	  });

      console.log(res);
  	  if (res.err) {
  	  	dispatch(setRegistrationError('Error Registering. Try again!'));
  	  	return;
  	  }
	
  	  await AsyncStorage.setItem('userDetails',  JSON.stringify(res.body.data));
  	  
  	  dispatch(saveUserDetails(res.body.data));
  	}catch(e){
	  console.log(e);
	  dispatch(setRegistrationError('Error Registering. Check network connectivity!'));
  	}
  			
  };
}

export function updateSubject({phone, firstname, lastname, email, nationality, dateOfBirth, nextOfKin, nextOfKinPhone, idNumber, idType}){
  return async (dispatch, getState) => {
	dispatch(startUpdateSubject());
	  
	try {
	  const uniqueId  = getState().auth.userDetails.unique_id;
	  const userId  = getState().auth.userDetails.id;
  	  const api = getFrisbee();
  	  const res  = await api.post('/api/subjects/anon/' + userId, {
  	    body: {
  	      phone,
	      unique_id: uniqueId,
  	      first_name: firstname,
	      last_name: lastname,
	      email,
	      nationality,
	      date_of_birth: dateOfBirth,
	      next_of_kin: nextOfKin,
	      next_of_kin_phone: nextOfKinPhone,
	      id_number: idNumber,
	      id_type: idType
  	    }
  	  });
	  
  	  if (res.err) {
  	  	dispatch(setUpdateSubjectError('Error Registering. Try again!'));
  	  	return;
  	  }
	  
  	  await AsyncStorage.setItem('userDetails',  JSON.stringify(res.body.data));
  	  
  	  dispatch(saveUserDetails(res.body.data));
	}catch(e){
	  dispatch(setUpdateSubjectError('Error updating information. Check network connectivity!'));
	}
  }
}

/*
* Delete subject account details
*/
export function deleteSubject(){
  return async (dispatch, getState) => {
	dipatch(startDeleteSubject());
		
	try{
	  const userId  = getState().auth.userDetails.id;
  	  const api = getFrisbee();
	  const res  = await api.delete('/api/subjects/anon/' + userId);
	
  	  if (res.err) {
  	  	dispatch(setDeleteSubjectError('Error deleting information. Try again!'));
  	  	return;
  	  }
	  
	}catch(e){
	  dispatch(setDeleteSubjectError('Error deleting information. Check network connectivity!'));
	}
  }
}
