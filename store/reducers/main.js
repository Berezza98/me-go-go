import { UPDATE_ACTIVE_INDEX, UPDATE_CURRENT_PAGE, INCREASE_CURRENT_PAGE } from '../storeConsts.js';
import { PER_ROW } from '../../constants.js'

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
    case INCREASE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: ++state.currentPage
      }
    default:
      return state;
  }
}

export const getActiveIndex = state => state.main.activeIndex;
export const getCurrentPage = state => state.main.currentPage;
export const getActiveRow = state => Math.floor(state.main.activeIndex / PER_ROW);

export default reducer;