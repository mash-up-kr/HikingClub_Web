import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { reducer, State } from './reducer';
import { createWrapper, Context } from 'next-redux-wrapper';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

// eslint-disable-next-line unused-imports/no-unused-vars
export const makeStore = (context: Context) => {
  const store = createStore(reducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
};

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
