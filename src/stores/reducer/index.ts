import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, AnyAction } from "redux";

export interface State {}

const initialState: State = {
  repos: [],
  user: {
    username: "",
    repoCount: 0,
    totalStars: 0,
  },
};

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ appState: reducer });

export type RootState = ReturnType<typeof rootReducer>;
