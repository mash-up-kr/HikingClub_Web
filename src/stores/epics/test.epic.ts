import { Epic, ofType } from "redux-observable";
import { ActionTypes } from "../actions";
import { tap, map } from "rxjs";

export const testEpic: Epic = (action$, state) =>
  action$.pipe(
    ofType("TEST"),
    map((action$) => ({
      type: "TEST2",
      payload: action$.payload,
    }))
  );
