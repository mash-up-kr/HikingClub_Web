/* External Dependencies */
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import * as roadAPI from 'stores/apis/roadAPI';

export const getRoadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REQUEST_GET_ROAD),
    mergeMap((action) => {
      const { roadId } = action.payload;

      return from(roadAPI.getRoad({ roadId })).pipe(
        map((result: any) => result.data?.data),
        map((payload) => ({
          type: ActionTypes.REQUEST_GET_ROAD_SUCCESS,
          payload,
        })),
        catchError((payload) =>
          of({
            type: ActionTypes.REQUEST_GET_ROAD_ERROR,
            payload: payload.response.data,
          })
        )
      );
    })
  );

export const removeRoadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REQUEST_REMOVE_ROAD),
    mergeMap((action) => {
      const { roadId } = action.payload;

      return from(roadAPI.removeRoad({ roadId })).pipe(
        map((result: any) => result.data),
        map((data) => {
          if (
            data?.resCode === 'FAILED_AUTHORIZATION' ||
            data?.resCode === 'NOT_AUTHORIZED_EDIT' ||
            data?.resCode === 'NOT_AUTHORIZED_DELETE'
          ) {
            if (data?.resCode === 'FAILED_AUTHORIZATION' && window.webkit) {
              window.webkit.messageHandlers.handler.postMessage({
                function: 'expire_token',
              });
            }

            return {
              type: ActionTypes.REQUEST_REMOVE_ROAD_ERROR,
              payload: {
                message: [data?.message],
              },
            };
          }
          return {
            type: ActionTypes.REQUEST_REMOVE_ROAD_SUCCESS,
            payload: data?.data,
          };
        }),
        catchError((payload) =>
          of({
            type: ActionTypes.REQUEST_REMOVE_ROAD_ERROR,
            payload: payload.response.data,
          })
        )
      );
    })
  );

export default combineEpics(getRoadEpic, removeRoadEpic);
