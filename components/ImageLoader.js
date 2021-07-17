export default class ImageLoader {
  constructor(parent) {
    this.parent = parent;
  }

  render () {
    this.el = document.createElement('div');
    this.el.classList.add('loader');
    this.el.innerText = 'Loading...';

    this.parent.append(this.el);
  }
}