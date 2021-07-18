import { APPEND_IMAGES, PREPEND_IMAGES, UPDATE_IMAGES } from '../storeConsts.js';
import { getRecentPhotosXHR } from '../../api.js';
import { getCurrentPage } from '../reducers/main.js';
import { updateIsLoadingData, updateTotalPagesCount } from './main.js';

export const appendImages = payload => ({
  type: APPEND_IMAGES,
  payload, 
});

export const prependImages = payload => ({
  type: PREPEND_IMAGES,
  payload, 
});

export const updateImages = payload => ({
  type: UPDATE_IMAGES,
  payload, 
});

export const getImagesData = (addInEnd, initLoading) => async (dispatch, getState) => {
  try {
    const page = getCurrentPage(getState());
    dispatch(updateIsLoadingData(true));
    const data = await getRecentPhotosXHR(page, initLoading);
    dispatch(updateTotalPagesCount(data.photos.pages));
    if (addInEnd) {
      dispatch(appendImages(data.photos.photo.map(photoObj => photoObj.url_q)));
    } else {
      dispatch(prependImages(data.photos.photo.map(photoObj => photoObj.url_q)));
    }
    dispatch(updateIsLoadingData(false));
  } catch (e) {
    dispatch(updateIsLoadingData(false));
  }
}