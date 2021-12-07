/* External Dependencies */
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import {
  requestCreateRoadSuccess,
  requestCreateRoadError,
  requestUpdateRoadSuccess,
  requestUpdateRoadError,
  requestGetPlacesSuccess,
  requestGetPlacesError,
} from 'stores/actions/editActions';
import * as editAPI from 'stores/apis/editAPI';

export const createRoadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REQUEST_CREATE_ROAD),
    mergeMap((action) => {
      return from(editAPI.createRoad(action.payload)).pipe(
        map((result: any) => result.data),
        map((data) => {
          if (
            data?.resCode === 'FAILED_AUTHORIZATION' ||
            data?.resCode === 'NOT_AUTHORIZED_EDIT'
          ) {
            if (data?.resCode === 'FAILED_AUTHORIZATION' && window.webkit) {
              window.webkit.messageHandlers.handler.postMessage({
                function: 'expire_token',
              });
            }

            return requestCreateRoadError({ message: [data?.message] });
          }
          return requestCreateRoadSuccess(data?.data);
        }),
        catchError((payload) =>
          of(requestCreateRoadError(payload.response.data))
        )
      );
    })
  );

export const updateRoadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REQUEST_UPDATE_ROAD),
    mergeMap((action) => {
      return from(editAPI.updateRoad(action.payload)).pipe(
        map((result: any) => result.data),
        map((data) => {
          if (
            data?.resCode === 'FAILED_AUTHORIZATION' ||
            data?.resCode === 'NOT_AUTHORIZED_EDIT'
          ) {
            if (data?.resCode === 'FAILED_AUTHORIZATION' && window.webkit) {
              window.webkit.messageHandlers.handler.postMessage({
                function: 'expire_token',
              });
            }

            return requestUpdateRoadError({ message: [data?.message] });
          }
          return requestUpdateRoadSuccess(data?.data);
        }),
        catchError((payload) =>
          of(requestUpdateRoadError(payload.response.data))
        )
      );
    })
  );

export const getPlacesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REQUEST_GET_PLACES),
    mergeMap((action) => {
      return from(editAPI.getPlaces(action.payload)).pipe(
        map((result: any) => result.data?.data),
        map((payload) => requestGetPlacesSuccess(payload)),
        catchError((payload) =>
          of(requestGetPlacesError(payload.response.data))
        )
      );
    })
  );

export default combineEpics(createRoadEpic, updateRoadEpic, getPlacesEpic);
