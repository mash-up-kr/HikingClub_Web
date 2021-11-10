/* External Dependencies */

/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import { LayoutActions } from 'stores/actions/layoutActions';

interface State {
  snackbar: {
    open: boolean;
    type: 'success' | 'error';
    message: string;
  };
}

const initialState: State = {
  snackbar: {
    open: false,
    type: 'success',
    message: '',
  },
};

function layoutReducer(
  state: State = initialState,
  action: LayoutActions
): State {
  switch (action.type) {
    case ActionTypes.OPEN_SNACK_BAR: {
      const { type, message } = action.payload;
      return { ...state, snackbar: { open: true, type, message } };
    }
    case ActionTypes.CLOSE_SNACK_BAR: {
      return { ...initialState };
    }
    default:
      return state;
  }
}

export default layoutReducer;
