import {
  UPDATE_ACTIVE_INDEX, UPDATE_CURRENT_PAGE, INCREASE_CURRENT_PAGE,
  DECREASE_CURRENT_PAGE, UPDATE_IS_LOADING_DATA, UPDATE_TOTAL_PAGES_COUNT,
} from '../storeConsts.js';
import { PER_ROW } from '../../constants.js'

const initState = {
  activeIndex: 0,
  currentPage: 1,
  isLoadingData: false,
  totalPagesCount: null,
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
    case DECREASE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: --state.currentPage
      }
    case UPDATE_IS_LOADING_DATA:
      return {
        ...state,
        isLoadingData: payload
      }
    case UPDATE_TOTAL_PAGES_COUNT:
      return {
        ...state,
        totalPagesCount: payload
      }
    default:
      return state;
  }
}

export const getActiveIndex = state => state.main.activeIndex;
export const getCurrentPage = state => state.main.currentPage;
export const getActiveRow = state => Math.floor(state.main.activeIndex / PER_ROW);
export const getIsLoadingData = state => state.main.isLoadingData;
export const getTotalPagesCount = state => state.main.totalPagesCount;

export default reducer;