import createStore from '../utils/StateManager.js';
import mainReducer from './reducers/index.js';
import thunkSupport from '../utils/thunkSupport.js';

const store = createStore(mainReducer);
store.dispatch = thunkSupport(store);

export default store;