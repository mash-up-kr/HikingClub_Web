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

export type EditActions =
  | ReturnType<typeof setRoad>
  | ReturnType<typeof setTitle>
  | ReturnType<typeof addHashTag>
  | ReturnType<typeof removeHashTag>
  | ReturnType<typeof setContent>;
