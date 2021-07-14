import {
	UPDATE_UPLOADURL
} from '../actions/SettingsActions';
import { API_BASE_URL } from '../Constants';

const initialState = {
	uploadURL: 'https://demo.project-thea.org'
}

export default function settings (state = initialState, action) {
  switch (action.type) {
	case UPDATE_UPLOADURL:
	  return {
		...state,
		uploadURL: action.uploadURL
	  }
	default:
	return state;
  }
}