export const API_BASE_URL = __DEV__ ? 'http://192.168.1.7:8005' : 'https://svr.project-thea.org'

const Frisbee = require('frisbee'); 

/*
* Get configure fribee instance 
*
* @param string token The authentication string
* @param string apiBaseUrl The base URL for the API service
*/
export function getFrisbee(token, apiBaseUrl){
	
	const apiUrl = apiBaseUrl ? apiBaseUrl : API_BASE_URL;
	let tokenHeader = {};
	if(token !== null && token !== undefined){
		tokenHeader = {'Authorization': 'Bearer ' + token};
	}

	return new Frisbee({
		baseURI: apiUrl,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			...tokenHeader
		},
		logRequest : (a, b) => {
			console.log(a, b);
		}
	});
}

