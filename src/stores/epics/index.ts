/* External Dependencies */
import { combineEpics, Epic } from 'redux-observable';

/* Internal dependencies */
import roadEpic from './roadEpic';
import editEpic from './editEpic';
import { testEpic } from './test.epic';

const rootEpic: Epic = combineEpics(testEpic, roadEpic, editEpic);

export default rootEpic;
