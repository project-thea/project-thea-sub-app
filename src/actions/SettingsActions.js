export const UPDATE_UPLOADURL = 'UPDATE_UPLOADURL';


export function updateUploadURL (uploadURL) {
	return {
		type: UPDATE_UPLOADURL,
		uploadURL
	}
}