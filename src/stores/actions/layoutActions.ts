/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import { actionCreator } from 'utils/reduxUtils';

interface OpenSnackbarPayload {
  type: 'success' | 'error';
  message: string;
}

interface CloseSnackbarPayload {}

export const openSnackbar = actionCreator<
  ActionTypes.OPEN_SNACK_BAR,
  OpenSnackbarPayload
>(ActionTypes.OPEN_SNACK_BAR);

export const closeSnackbar = actionCreator<
  ActionTypes.CLOSE_SNACK_BAR,
  CloseSnackbarPayload
>(ActionTypes.CLOSE_SNACK_BAR);

export type OpenSnackbarAction = ReturnType<typeof openSnackbar>;
export type CloseSnackbarAction = ReturnType<typeof closeSnackbar>;

export type LayoutActions = OpenSnackbarAction | CloseSnackbarAction;
