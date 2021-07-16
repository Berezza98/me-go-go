import store from '../store/index.js';
import { getActiveIndex } from '../store/reducers/main.js';

export default class ImageContainer {
  constructor(parent, url, index) {
    this.parent = parent;
    this.url = url;
    this.index = index;
    this.el = null;

    store.subscribe(this.updateFromStore.bind(this));
  }

  isActive(index) {
    return index === this.index;
  }

  shouldUpdate() {
    const oldIsActive = this.isActive(this.activeIndex)
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
    this.el = document.createElement('img');
    this.el.classList.add('image-wrapper');
    this.el.src = this.url

    this.addActiveStyles();

    this.parent.append(this.el);
  }
}