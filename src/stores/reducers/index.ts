/* External Dependencies */
import { combineReducers } from 'redux';

/* Internal dependencies */
import editReducer from './editReducer';
import roadReducer from './roadReducer';

const rootReducer = combineReducers({
  editReducer,
  roadReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
