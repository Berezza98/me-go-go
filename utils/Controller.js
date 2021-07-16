import EventEmitter from './EventEmitter.js';
import { UP, DOWN, RIGHT, LEFT } from '../constants.js';

export default class Controller extends EventEmitter {
  constructor() {
    super();

    this.addKeyboardHandlers();
    this.addScrollHandlers();
  }

  addKeyboardHandlers() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 38) {
        return this.emit(UP);
      }
      if (e.keyCode === 40) {
        return this.emit(DOWN);
      }
      if (e.keyCode === 37) {
        return this.emit(LEFT);
      }
      if (e.keyCode === 39) {
        return this.emit(RIGHT);
      }
    })
  }

  addScrollHandlers() {
    window.addEventListener('wheel', this.scrollHandler());
  }

  scrollHandler() {
    let timer = null;
    return (event) => {
      if (timer === null) {
        const scrollDown = this.isScrollingDown(event);
        this.emit(scrollDown ? DOWN : UP);
      }
  
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
      }, 100);
    }
  }

  isScrollingDown(event) {
    return event.wheelDelta > 0;
  }
}