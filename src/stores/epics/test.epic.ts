import { Epic, ofType } from 'redux-observable';
import { map } from 'rxjs';

// eslint-disable-next-line unused-imports/no-unused-vars
export const testEpic: Epic = (action$, state) =>
  action$.pipe(
    ofType('TEST'),
    map((action) => ({
      type: 'TEST2',
      payload: action.payload,
    }))
  );
