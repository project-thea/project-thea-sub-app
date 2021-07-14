import { combineReducers } from 'redux';
import auth from './AuthReducer';
import track from './TrackingReducer';
import settings from './SettingsReducer';
import tests from './TestReducer';
const rootReducer = combineReducers({
	auth,
	track,
	settings,
	tests
});

export default rootReducer;