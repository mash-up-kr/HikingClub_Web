import { combineEpics } from "redux-observable";
import { testEpic } from "./test.epic";

export const rootEpic = combineEpics(testEpic);
