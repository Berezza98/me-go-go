import createStore from '../utils/StateManager.js';
import reducer from './reducers/index.js';
import thunkSupport from '../utils/thunkSupport.js';

const store = createStore(reducer);
store.dispatch = thunkSupport(store);

export default store;