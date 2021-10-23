/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import Content from 'models/Content';
import { actionCreator } from 'utils/reduxUtils';

interface SetContentPayload {
  content: Content;
}

export const setContent = actionCreator<
  ActionTypes.SET_CONTENT,
  SetContentPayload
>(ActionTypes.SET_CONTENT);

export type EditActions = ReturnType<typeof setContent>;
