import {
	FETCH_TESTS,
	SET_FETCH_TESTS_ERROR,
	SET_TESTS
} from '../actions/TestActions';

const initialState = {
	tests: [],
	fetchingTests: false,
	fetchingTestsError: null
}

export default function tests(state = initialState, action) {
  switch (action.type) {
	case FETCH_TESTS:
	  return {
		...state,
		fetchingTests: true,
		fetchingTestsError: null
	  }
	break;
	case SET_FETCH_TESTS_ERROR:
	  return {
		...state,
		fetchingTests: false,
		fetchingTestsError: action.message
	  }
	break;
	case SET_TESTS:
	  return {
		...state,
		fetchingTests: false,
		fetchingTestsError: null,
		tests: action.tests
	  }
	break;
	default:
		return state;
	break;
  }
}