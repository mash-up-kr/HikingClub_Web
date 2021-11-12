/* Internal dependencies */
import { RootState } from 'stores/reducers';

export const getSnackBarState = (state: RootState) =>
  state.layoutReducer.snackbar;
