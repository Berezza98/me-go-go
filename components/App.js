import ImageContainer from './ImageContainer.js';
import Controller from '../utils/Controller.js';
import store from '../store/index.js';
import { UP, DOWN, RIGHT, LEFT, PER_ROW, ROW_HEIGHT, IMAGES_COUNT } from '../constants.js';
import {
  getActiveIndex, getActiveRow, getCurrentPage,
  getIsLoadingData,
} from '../store/reducers/main.js';
import { getImages, getImagesRowCount } from '../store/reducers/images.js';
import { updateActiveIndex, increaseCurrentPage, decreaseCurrentPage } from '../store/actions/main.js';
import { getImagesData, updateImages } from '../store/actions/images.js';

export default class App {
  constructor(root) {
    this.root = root;
    this.el = null;
    this.controller = new Controller();
    this._scrollCounter = 0;

    store.subscribe(this.updateFromStore.bind(this));
    store.dispatch(getImagesData(true, true));
    this.addControllerHandlers();
  }

  get isLoadingData() {
    return getIsLoadingData(store.getState());
  }

  get scrollCounter() {
    return this._scrollCounter;
  }

  set scrollCounter(value) {
    if (value >= 0) {
      this._scrollCounter = value;
    }
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

  get activeRow() {
    return getActiveRow(store.getState());
  }

  get rowCount() {
    return getImagesRowCount(store.getState());
  }

  get currentPage() {
    return getCurrentPage(store.getState());
  }

  shouldRerender() {
    if (store.getState().images && this.images) {
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
  }

  handleLeft() {
    if (this.activeIndex > 0 && this.activeIndex % PER_ROW !== 0) {
      this.activeIndex -= 1;
    }
  }

  handleDown() {
    if (!this.images[this.activeIndex + PER_ROW]) {
      return;
    }

    this.activeIndex += PER_ROW;
    this.scrollCounter++;
    this.scroll();
    if (this.activeRow >= this.rowCount - 2 && !this.isLoadingData) {
      store.dispatch(increaseCurrentPage());
      store.dispatch(updateImages(this.images.slice(this.images.length - PER_ROW * 2)));
      store.dispatch(getImagesData(true));
      this.activeIndex = this.activeIndex % PER_ROW;
      this.scrollCounter = this.activeRow;
      this.scroll(true);
    }
  }

  handleUp() {
    if (!this.images[this.activeIndex - PER_ROW] && this.currentPage === 1) {
      return;
    }

    this.activeIndex -= PER_ROW;
    this.scrollCounter--;
    this.scroll();
    if (this.activeRow < 1 && this.currentPage > 1 && !this.isLoadingData) {
      store.dispatch(decreaseCurrentPage());
      store.dispatch(updateImages(this.images.slice(0, PER_ROW * 2)));
      store.dispatch(getImagesData(false));
      this.activeIndex = IMAGES_COUNT - (PER_ROW * 2) + this.activeIndex;
      this.scrollCounter = this.activeRow;
      this.scroll(true);
    }
  }

  scroll(immediately) {
    this.el.scrollTo({
      top: this.scrollCounter * ROW_HEIGHT,
      left: 0,
      behavior: immediately ? 'auto' : 'smooth'
    });
  }

  render() {
    if (this.el) {
      this.el.remove();
    }

    this.el = document.createElement('div');
    this.el.classList.add('container');
    this.images.forEach((image, index) => {
      new ImageContainer(this.el, image, index).render();
    });
    this.root.append(this.el);
    this.scroll(true);
  }
}