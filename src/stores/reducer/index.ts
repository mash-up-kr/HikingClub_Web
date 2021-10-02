import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, AnyAction } from "redux";
import { ActionTypes } from "../actions";

export interface State {
  test: string;
}

export const initialState: State = {
  test: "init",
};

export const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "TEST2":
      return { ...state, test: action.payload };
    default:
      return state;
  }
};

// export const rootReducer = combineReducers({ reducer });

// export type RootState = ReturnType<typeof rootReducer>;
