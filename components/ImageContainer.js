export default class ImageContainer {
  constructor(parent, url, isActive) {
    this.parent = parent;
    this.url = url
    this.isActive = isActive;
  }

  render() {
    const img = document.createElement('img');
    img.classList.add('image-wrapper');
    img.src = this.url

    if (this.isActive) {
      img.classList.add('active');
    }

    this.parent.append(img);
  }
}