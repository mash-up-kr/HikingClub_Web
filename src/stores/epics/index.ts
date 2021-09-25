import { combineEpics } from "redux-observable";
import { testEpic } from "./repo.epic";

export const rootEpic = combineEpics(testEpic);
