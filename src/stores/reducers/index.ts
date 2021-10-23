/* External Dependencies */
import { combineReducers } from 'redux';

/* Internal dependencies */
import contentReducer from './contentReducer';

const rootReducer = combineReducers({
  contentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
