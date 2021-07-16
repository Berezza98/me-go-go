export default function(store) {
  const dispatch = store.dispatch;
  return action => {
    if (typeof action === 'function') {
      return action(dispatch, store.getState);
    }
    dispatch(action);
  }
}