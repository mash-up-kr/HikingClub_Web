/* External Dependencies */
import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createWrapper, Context } from 'next-redux-wrapper';

/* Internal dependencies */
import rootReducer, { RootState } from './reducers';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

// eslint-disable-next-line unused-imports/no-unused-vars
export const makeStore = (context: Context) => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
