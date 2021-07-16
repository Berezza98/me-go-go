import { UPDATE_ACTIVE_INDEX, UPDATE_IMAGES } from '../storeConsts.js';
import { getRecentPhotosXHR } from '../../api.js';
import { getCurrentPage } from '../reducers/index.js';

export const updateActiveIndex = payload => ({
  type: UPDATE_ACTIVE_INDEX,
  payload, 
});

export const updateImages = payload => ({
  type: UPDATE_IMAGES,
  payload, 
});

export const getImagesData = () => async (dispatch, getState) => {
  const page = getCurrentPage(getState());
  const data = await getRecentPhotosXHR(page);
  dispatch(updateImages(data.photos.photo.map(photoObj => photoObj.url_q)));
  console.log(data);
}