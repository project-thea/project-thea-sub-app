import {
	START_TRACKING,
	STOP_TRACKING,
	PAUSE_TRACKING
} from '../actions/TrackingActions';

const initialState = {
	tracking: false
}

export default function track (state = initialState, action) {
  switch (action.type) {
	case START_TRACKING:
	  return {
		...state,
		tracking: true
	  }
	case STOP_TRACKING:
	  return {
		...state,
		tracking: false
	  }
	default:
	return state;
  }
}