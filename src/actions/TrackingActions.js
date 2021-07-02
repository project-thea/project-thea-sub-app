export const START_TRACKING = 'START_TRACKING';
export const STOP_TRACKING = 'STOP_TRACKING';
export const PAUSE_TRACKING = 'PAUSE_TRACKING';

export function startTracking(){
	return {
		type: START_TRACKING
	}
}

export function stopTracking(){
	return {
		type: STOP_TRACKING
	}
}