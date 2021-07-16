import { UPDATE_ACTIVE_INDEX } from '../storeConsts.js';

export const updateActiveIndex = payload => ({
  type: UPDATE_ACTIVE_INDEX,
  payload, 
});