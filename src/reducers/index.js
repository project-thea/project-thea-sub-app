import { combineReducers } from 'redux';
import auth from './AuthReducer';
import track from './TrackingReducer';
import settings from './SettingsReducer';
const rootReducer = combineReducers({
	auth,
	track,
	settings
});

export default rootReducer;
