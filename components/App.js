import ImageContainer from './ImageContainer.js';
import Controller from '../utils/Controller.js';
import store from '../store/index.js';
import { UP, DOWN, RIGHT, LEFT, PER_ROW } from '../constants.js';
import { getActiveIndex } from '../store/reducers/main.js';
import { getImages } from '../store/reducers/images.js';
import { updateActiveIndex } from '../store/actions/main.js';
import { getImagesData } from '../store/actions/images.js';

export default class App {
  constructor(root) {
    this.root = root;
    this.container = null;
    this.controller = new Controller();

    store.subscribe(this.updateFromStore.bind(this));
    store.dispatch(getImagesData());
    this.addControllerHandlers();
  }

  get activeIndex() {
    return this._activeIndex;
  }

  set activeIndex(value) {
    if (this.activeIndex !== value) {
      this._activeIndex = value;
      store.dispatch(updateActiveIndex(value));
    }
  }

  shouldRerender() {
    if (store.getState().images && this.images) {
      console.log('shouldRerender: ', getImages(store.getState()) !== this.images);
      return getImages(store.getState()) !== this.images;
    }
  }

  updateFromStore() {
    const shouldRerender = this.shouldRerender();
    this.images = getImages(store.getState());
    this._activeIndex = getActiveIndex(store.getState());
    if (shouldRerender) {
      this.render();
    }
  }

  addControllerHandlers() {
    this.controller.on(UP, this.handleUp.bind(this));
    this.controller.on(DOWN, this.handleDown.bind(this));
    this.controller.on(LEFT, this.handleLeft.bind(this));
    this.controller.on(RIGHT, this.handleRight.bind(this));
  }

  handleRight() {
    if (this.activeIndex === 0 || (this.activeIndex + 1) % PER_ROW !== 0) {
      this.activeIndex += 1;
    }
    console.log(this.activeIndex);
  }

  handleLeft() {
    if (this.activeIndex > 0 && this.activeIndex % PER_ROW !== 0) {
      this.activeIndex -= 1;
    }
    console.log(this.activeIndex);
  }

  handleDown() {
    if (this.images[this.activeIndex + PER_ROW] !== undefined) {
      this.activeIndex += PER_ROW;
    }
    console.log(this.activeIndex);
  }

  handleUp() {
    if (this.images[this.activeIndex - PER_ROW] !== undefined) {
      this.activeIndex -= PER_ROW;
    }
    console.log(this.activeIndex);
  }

  render() {
    if (this.container) {
      this.container.remove();
    }

    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.images.forEach((image, index) => {
      new ImageContainer(this.container, image, index).render();
    });
    this.root.append(this.container);
  }
}