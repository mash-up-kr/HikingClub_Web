/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import { RoadPOJO } from 'models/Road';
import { actionCreator } from 'utils/reduxUtils';

interface OpenImageDetailPayload {
  imgUrl: string;
}

export interface RequestGetRoadPayload {
  roadId: string;
}

export interface RequestRemoveRoadPayload {
  roadId: string;
}

export const openImageDetail = actionCreator<
  ActionTypes.OPEN_IMAGE_DETAIL,
  OpenImageDetailPayload
>(ActionTypes.OPEN_IMAGE_DETAIL);

export const closeImageDetail = actionCreator<ActionTypes.CLOSE_IMAGE_DETAIL>(
  ActionTypes.CLOSE_IMAGE_DETAIL
);

export const requestGetRoad = actionCreator<
  ActionTypes.REQUEST_GET_ROAD,
  RequestGetRoadPayload
>(ActionTypes.REQUEST_GET_ROAD);

export const requestGetRoadSuccess = actionCreator<
  ActionTypes.REQUEST_GET_ROAD_SUCCESS,
  RoadPOJO
>(ActionTypes.REQUEST_GET_ROAD_SUCCESS);

export const requestGetRoadError =
  actionCreator<ActionTypes.REQUEST_GET_ROAD_ERROR>(
    ActionTypes.REQUEST_GET_ROAD_ERROR
  );

export const requestRemoveRoad = actionCreator<
  ActionTypes.REQUEST_REMOVE_ROAD,
  RequestRemoveRoadPayload
>(ActionTypes.REQUEST_REMOVE_ROAD);

export type RequestGetRoadAction = ReturnType<typeof requestGetRoad>;
export type RequestGetRoadSuccessAction = ReturnType<
  typeof requestGetRoadSuccess
>;
export type RequestGetRoadErrorAction = ReturnType<typeof requestGetRoadError>;

export type RoadActions =
  | RequestGetRoadAction
  | RequestGetRoadSuccessAction
  | RequestGetRoadErrorAction;
