export const SEND_AUTH_DETAILS = 'SEND_AUTH_DETAILS';

export const ERROR_AUTHENTICATING = 'ERROR_AUTHENTICATING';

export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';

export function sendAuthDetails(){
	return {
		type: SEND_AUTH_DETAILS
	}
}

export function errorAuthenticating(message){
	return {
		type: ERROR_AUTHENTICATING,
		message
	}
}

export function saveUserDetails(userDetails){
	return {
		type: SAVE_USER_DETAILS,
		userDetails
	}
}
export function authUser(email, password){
	return async (dispatch, getState) => {
		dispatch(sendAuthDetails());
		
		 const response  = await api.post('/authenticate', {
			body: {
				email,
				password
			}
		});
		
		 if (res.err) {
			 dispatch(errorAuthenticating('Authenticating Error. Try again!'));
		 }

		dispatch(saveUserDetails(response.body));
				
	};
}
