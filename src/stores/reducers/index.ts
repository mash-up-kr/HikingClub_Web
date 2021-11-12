/* External Dependencies */
import { combineReducers } from 'redux';

/* Internal dependencies */
import editReducer from './editReducer';
import roadReducer from './roadReducer';
import layoutReducer from './layoutReducer';

const rootReducer = combineReducers({
  editReducer,
  roadReducer,
  layoutReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
