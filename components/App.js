import ImageContainer from './ImageContainer.js';
import Controller from '../utils/Controller.js';
import store from '../store/index.js';
import { UP, DOWN, RIGHT, LEFT, PER_ROW } from '../constants.js';
import { getImages, getActiveIndex } from '../store/reducers/index.js';
import { updateActiveIndex, getImagesData } from '../store/actions/index.js';
import { theSameArrayItems } from '../utils/index.js';

export default class App {
  constructor(root) {
    this.root = root;
    this.container = null;
    this.controller = new Controller();

    store.dispatch(getImagesData());
    store.subscribe(this.updateFromStore.bind(this));
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

  shouldUpdate(newState) {
    console.log(newState.images, this.images);
    if (!theSameArrayItems(newState.images, this.images)) {
      console.log('need rerender');
      return true;
    }
  }

  updateFromStore(newState) {
    this.images = getImages(store.getState());
    this._activeIndex = getActiveIndex(store.getState());
    if (this.shouldUpdate(newState)) {
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
      new ImageContainer(this.container, image, index === this.activeIndex).render();
    });
    this.root.append(this.container);
  }
}