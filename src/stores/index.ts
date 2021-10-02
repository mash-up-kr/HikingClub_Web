import { createStore, applyMiddleware, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { reducer } from "./reducer";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { State, initialState } from "./reducer";
import { rootEpic } from "./epics";

const epicMiddleware = createEpicMiddleware();

export const makeStore = (context: Context) => {
  const store = createStore(reducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
};

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
