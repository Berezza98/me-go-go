import { UPDATE_ACTIVE_INDEX, UPDATE_IMAGES, UPDATE_CURRENT_PAGE } from '../storeConsts.js';

const initState = {
  images: [],//new Array(50).fill(null),
  activeIndex: 0,
  currentPage: 1,
};

function reducer(state = initState, { type, payload }) {
  switch (type) {
    case UPDATE_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: payload
      }
    case UPDATE_IMAGES:
      return {
        ...state,
        images: [...state.images, ...payload]
      }
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload
      }
    default:
      return state;
  }
}

export const getImages = state => state.images;
export const getActiveIndex = state => state.activeIndex;
export const getCurrentPage = state => state.currentPage;

export default reducer;