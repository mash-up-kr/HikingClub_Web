import { Epic, ofType } from "redux-observable";
import { ActionTypes } from "../actions";
import { tap } from "rxjs";

export const testEpic: Epic = (action$, state) =>
  action$.pipe((ofType(ActionTypes.TEST), tap(console.log)));
