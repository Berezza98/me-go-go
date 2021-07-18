import store from '../store/index.js';
import { getActiveIndex } from '../store/reducers/main.js';
import ImageLoader from './ImageLoader.js';

export default class ImageContainer {
  constructor(parent, url, index) {
    this.parent = parent;
    this.url = url;
    this.index = index;
    this.el = null;
    this._isLoading = true;

    this.downloadImage();
    store.subscribe(this.updateFromStore.bind(this));
  }

  get isLoading() {
    return this._isLoading;
  }

  set isLoading(value) {
    if (this.isLoading !== value) {
      this._isLoading = value;
      this.render();
    }
  }

  isActive(index) {
    return index === this.index;
  }

  shouldUpdate() {
    const oldIsActive = this.isActive(this.activeIndex);
    const newIsActive = this.isActive(getActiveIndex(store.getState()));
    if ((this.activeIndex || this.activeIndex === 0) && oldIsActive !== newIsActive) {
      return true;
    }
  }

  updateFromStore() {
    const shouldUpdate = this.shouldUpdate();
    this.activeIndex = getActiveIndex(store.getState());
    if (shouldUpdate) {
      this.addActiveStyles();
    }
  }

  downloadImage() {
    this.image = new Image();
    this.image.onload = this.downloadHandler.bind(this);
    this.image.onerror = this.downloadHandler.bind(this);
    this.image.src = this.url;
  }

  downloadHandler() {
    this.isLoading = false;
    this.loader.el.remove();
    this.render();
  }

  addActiveStyles() {
    if (this.isActive(this.activeIndex)) {
      return this.el.classList.add('active');
    }

    this.el.classList.remove('active');
  }

  remove() {
    this.el.remove();
  }

  render() {
    if (!this.el) {
      this.el = document.createElement('div');
      this.el.classList.add('image-wrapper');
      this.parent.append(this.el);
    }

    if (this.isLoading) {
      this.loader = new ImageLoader(this.el);
      this.loader.render();
    } else {
      this.el.append(this.image);
    }

    this.addActiveStyles();
  }
}