/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import Road from 'models/Road';
import { actionCreator } from 'utils/reduxUtils';

interface SetRoadPayload {
  road: Road;
}

interface SetTitlePayload {
  title: string;
}

interface AddHashTagPayload {
  hashTag: string;
}

interface RemoveHashTagPayload {
  hashTag: string;
}

interface SetContentPayload {
  content: string;
}

interface AddRoutePayload {
  latitude: number;
  longitude: number;
}

interface AddSpotPayload {
  latitude: number;
  longitude: number;
}

interface RemoveSpotPayload {
  index: number;
}

export const setRoad = actionCreator<ActionTypes.SET_ROAD, SetRoadPayload>(
  ActionTypes.SET_ROAD
);

export const setTitle = actionCreator<ActionTypes.SET_TITLE, SetTitlePayload>(
  ActionTypes.SET_TITLE
);

export const addHashTag = actionCreator<
  ActionTypes.ADD_HASHTAG,
  AddHashTagPayload
>(ActionTypes.ADD_HASHTAG);

export const removeHashTag = actionCreator<
  ActionTypes.REMOVE_HASHTAG,
  RemoveHashTagPayload
>(ActionTypes.REMOVE_HASHTAG);

export const setContent = actionCreator<
  ActionTypes.SET_CONTENT,
  SetContentPayload
>(ActionTypes.SET_CONTENT);

export const addRoute = actionCreator<ActionTypes.ADD_ROUTE, AddRoutePayload>(
  ActionTypes.ADD_ROUTE
);

export const removeRoute = actionCreator<ActionTypes.REMOVE_ROUTE>(
  ActionTypes.REMOVE_ROUTE
);

export const clearRoute = actionCreator<ActionTypes.CLEAR_ROUTE>(
  ActionTypes.CLEAR_ROUTE
);

export const addSpot = actionCreator<ActionTypes.ADD_SPOT, AddSpotPayload>(
  ActionTypes.ADD_SPOT
);

export const removeSpot = actionCreator<
  ActionTypes.REMOVE_SPOT,
  RemoveSpotPayload
>(ActionTypes.REMOVE_SPOT);

export type EditActions =
  | ReturnType<typeof setRoad>
  | ReturnType<typeof setTitle>
  | ReturnType<typeof addHashTag>
  | ReturnType<typeof removeHashTag>
  | ReturnType<typeof setContent>
  | ReturnType<typeof addRoute>
  | ReturnType<typeof removeRoute>
  | ReturnType<typeof clearRoute>
  | ReturnType<typeof addSpot>
  | ReturnType<typeof removeSpot>;
