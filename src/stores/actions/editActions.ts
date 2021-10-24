/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import Road from 'models/Road';
import { actionCreator } from 'utils/reduxUtils';

interface SetRoadPayload {
  road: Road;
}

export const setRoad = actionCreator<ActionTypes.SET_ROAD, SetRoadPayload>(
  ActionTypes.SET_ROAD
);

export type EditActions = ReturnType<typeof setRoad>;
