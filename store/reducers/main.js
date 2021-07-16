import { UPDATE_ACTIVE_INDEX, UPDATE_CURRENT_PAGE } from '../storeConsts.js';

const initState = {
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
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload
      }
    default:
      return state;
  }
}

export const getActiveIndex = state => state.main.activeIndex;
export const getCurrentPage = state => state.main.currentPage;

export default reducer;