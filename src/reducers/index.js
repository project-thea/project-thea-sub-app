import { combineReducers } from 'redux';
import auth from './AuthReducer';

const rootReducer = combineReducers({
	auth
});

export default rootReducer;
