import { getFrisbee } from '../Constants';

export const FETCH_TESTS = 'FETCH_TESTS';
export const SET_FETCH_TESTS_ERROR = 'SET_FETCH_TESTS_ERROR';
export const SET_TESTS = 'SET_TESTS';

export function fetchTests(){
	return {
		type: FETCH_TESTS
	}
}

export function setFetchTestsError(message){
	return {
		type: SET_FETCH_TESTS_ERROR,
		message
	}
}

/*
* Set subjects tests in state
*/
export function setTests(tests){
	return {
		type: SET_TESTS,
		tests
	}
}

export function getTests(){
	return async (dispatch, getState) => {
		dispatch(fetchTests());
		const userId  = getState().auth.userDetails.id;
		
		try{
			const api = getFrisbee();
			const res  = await api.get('/api/tests/subject/anon/' + userId);
			
			console.log(res);
			if(res.err){
				setFetchTestsError('Error fetching tests');
				return;
			}
			
			dispatch(setTests(res.body.data));
		
		}catch(e){
			dispatch(setFetchTestsError('Error establishing connection. Check connectivity.'));
		}
	}
}