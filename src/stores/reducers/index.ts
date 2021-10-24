/* External Dependencies */
import { combineReducers } from 'redux';

/* Internal dependencies */
import roadReducer from './roadReducer';

const rootReducer = combineReducers({
  roadReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
