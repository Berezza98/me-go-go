export default function createStore(reducer, state) {
  const callbacks = [];

  dispatch({});

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    callbacks.forEach(cb => cb(state));
  }

  function subscribe(cb) {
    cb(); // imediatly call cb to give init data
    callbacks.push(cb);
    return () => callbacks = callbacks.filter(callback => callback !== cb);
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}