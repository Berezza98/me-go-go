import {
  UPDATE_ACTIVE_INDEX, UPDATE_CURRENT_PAGE, INCREASE_CURRENT_PAGE,
  DECREASE_CURRENT_PAGE, UPDATE_IS_LOADING_DATA, UPDATE_TOTAL_PAGES_COUNT,
} from '../storeConsts.js';

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

export const decreaseCurrentPage = payload => ({
  type: DECREASE_CURRENT_PAGE,
  payload, 
});

export const updateIsLoadingData = payload => ({
  type: UPDATE_IS_LOADING_DATA,
  payload, 
});

export const updateTotalPagesCount = payload => ({
  type: UPDATE_TOTAL_PAGES_COUNT,
  payload, 
});