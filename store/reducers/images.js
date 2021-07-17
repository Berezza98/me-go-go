import { UPDATE_IMAGES } from '../storeConsts.js';
import { PER_ROW } from '../../constants.js';

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
export const getImagesRowCount = state => Math.ceil(state.images.data.length / PER_ROW);

export default reducer;