import { UPDATE_ACTIVE_INDEX, UPDATE_CURRENT_PAGE, INCREASE_CURRENT_PAGE } from '../storeConsts.js';

export const updateActiveIndex = payload => ({
  type: UPDATE_ACTIVE_INDEX,
  payload, 
});

export const updateCurrentPage = payload => ({
  type: UPDATE_CURRENT_PAGE,
  payload, 
});

export const increaseCurrentPage = payload => ({
  type: INCREASE_CURRENT_PAGE,
  payload, 
});