/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import Road, { RoadPOJO } from 'models/Road';
import { RoutePOJO } from 'models/Route';
import { SpotPOJO } from 'models/Spot';
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

interface AddCategoryPayload {
  categoryId: number;
}

interface ChangeSpotTitlePayload {
  index: number;
  title: string;
}

interface ChangeSpotContentPayload {
  index: number;
  content: string;
}

export interface RequestCreateRoadPayload {
  title: string;
  content: string;
  routes: RoutePOJO[];
  distance: number;
  placeCode: string;
  categoryId: number;
  spots: SpotPOJO[];
  images: string[];
  hashtags: string[];
}

export interface RequestUpdateRoadPayload {
  roadId: string;
  title: string;
  content: string;
  routes: RoutePOJO[];
  distance: number;
  placeCode: string;
  categoryId: number;
  spots: SpotPOJO[];
  images: string[];
  hashtags: string[];
}

export interface RequestGetPlacesPayload {
  latitude: number;
  longitude: number;
}

export interface RequestGetPlacesSuccessPayload {
  [index: number]: {
    code: string;
  };
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

export const addCategory = actionCreator<
  ActionTypes.ADD_CATEGORY,
  AddCategoryPayload
>(ActionTypes.ADD_CATEGORY);

export const changeSpotTitle = actionCreator<
  ActionTypes.CHANGE_SPOT_TITLE,
  ChangeSpotTitlePayload
>(ActionTypes.CHANGE_SPOT_TITLE);

export const changeSpotContent = actionCreator<
  ActionTypes.CHANGE_SPOT_CONTENT,
  ChangeSpotContentPayload
>(ActionTypes.CHANGE_SPOT_CONTENT);

export const initialize = actionCreator<ActionTypes.INITIALIZE>(
  ActionTypes.INITIALIZE
);

export const requestCreateRoad = actionCreator<
  ActionTypes.REQUEST_CREATE_ROAD,
  RequestCreateRoadPayload
>(ActionTypes.REQUEST_CREATE_ROAD);

export const requestCreateRoadSuccess = actionCreator<
  ActionTypes.REQUEST_CREATE_ROAD_SUCCESS,
  RoadPOJO
>(ActionTypes.REQUEST_CREATE_ROAD_SUCCESS);

export const requestCreateRoadError = actionCreator<
  ActionTypes.REQUEST_CREATE_ROAD_ERROR,
  any
>(ActionTypes.REQUEST_CREATE_ROAD_ERROR);

export const requestUpdateRoad = actionCreator<
  ActionTypes.REQUEST_UPDATE_ROAD,
  RequestUpdateRoadPayload
>(ActionTypes.REQUEST_UPDATE_ROAD);

export const requestUpdateRoadSuccess = actionCreator<
  ActionTypes.REQUEST_UPDATE_ROAD_SUCCESS,
  RoadPOJO
>(ActionTypes.REQUEST_UPDATE_ROAD_SUCCESS);

export const requestUpdateRoadError = actionCreator<
  ActionTypes.REQUEST_UPDATE_ROAD_ERROR,
  any
>(ActionTypes.REQUEST_UPDATE_ROAD_ERROR);

export const requestGetPlaces = actionCreator<
  ActionTypes.REQUEST_GET_PLACES,
  RequestGetPlacesPayload
>(ActionTypes.REQUEST_GET_PLACES);

export const requestGetPlacesSuccess = actionCreator<
  ActionTypes.REQUEST_GET_PLACES_SUCCESS,
  RequestGetPlacesSuccessPayload
>(ActionTypes.REQUEST_GET_PLACES_SUCCESS);

export const requestGetPlacesError =
  actionCreator<ActionTypes.REQUEST_GET_PLACES_ERROR>(
    ActionTypes.REQUEST_GET_PLACES_ERROR
  );

export type RequestCreateRoadAction = ReturnType<typeof requestCreateRoad>;
export type RequestCreateRoadSuccessAction = ReturnType<
  typeof requestCreateRoadSuccess
>;
export type RequestCreateRoadErrorAction = ReturnType<
  typeof requestCreateRoadError
>;

export type RequestUpdateRoadAction = ReturnType<typeof requestUpdateRoad>;
export type RequestUpdateRoadSuccessAction = ReturnType<
  typeof requestUpdateRoadSuccess
>;
export type RequestUpdateRoadErrorAction = ReturnType<
  typeof requestUpdateRoadError
>;

export type RequestGetPlacesAction = ReturnType<typeof requestGetPlaces>;
export type RequestGetPlacesSuccessAction = ReturnType<
  typeof requestGetPlacesSuccess
>;
export type RequestGetPlacesErrorAction = ReturnType<
  typeof requestGetPlacesError
>;

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
  | ReturnType<typeof removeSpot>
  | ReturnType<typeof changeSpotTitle>
  | ReturnType<typeof changeSpotContent>
  | ReturnType<typeof initialize>
  | ReturnType<typeof addCategory>
  | RequestCreateRoadAction
  | RequestCreateRoadSuccessAction
  | RequestCreateRoadErrorAction
  | RequestUpdateRoadAction
  | RequestUpdateRoadSuccessAction
  | RequestUpdateRoadErrorAction
  | RequestGetPlacesAction
  | RequestGetPlacesSuccessAction
  | RequestGetPlacesErrorAction;
