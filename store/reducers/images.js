import { UPDATE_IMAGES } from '../storeConsts.js';

const initState = {
  data: [],
};

function reducer(state = initState, { type, payload }) {
  switch (type) {
    case UPDATE_IMAGES:
      return {
        ...state,
        data: [...state.data, ...payload]
      }
    default:
      return state;
  }
}

export const getImages = state => state.images.data;

export default reducer;