import { default as main } from './main.js';
import { default as images } from './images.js';

export default function mainReducer(state = {}, action) {
  return {
    main: main(state.main, action),
    images: images(state.images, action),
  };
}