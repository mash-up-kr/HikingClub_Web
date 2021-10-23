/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import { actionCreator } from 'utils/reduxUtils';

interface OpenImageDetailPayload {
  imgUrl: string;
}

export const openImageDetail = actionCreator<
  ActionTypes.OPEN_IMAGE_DETAIL,
  OpenImageDetailPayload
>(ActionTypes.OPEN_IMAGE_DETAIL);

export const closeImageDetail = actionCreator<ActionTypes.CLOSE_IMAGE_DETAIL>(
  ActionTypes.CLOSE_IMAGE_DETAIL
);
