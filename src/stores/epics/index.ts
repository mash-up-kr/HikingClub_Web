/* External Dependencies */
import { combineEpics, Epic } from 'redux-observable';

/* Internal dependencies */
import roadEpic from './roadEpic';
import { testEpic } from './test.epic';

const rootEpic: Epic = combineEpics(testEpic, roadEpic);

export default rootEpic;
