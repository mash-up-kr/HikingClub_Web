/* External dependencies */
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';

export interface State {
  test: string;
  imgDetail: {
    isOpen: boolean;
    imgUrl: string;
  };
}

export const initialState: State = {
  test: 'init',
  imgDetail: {
    isOpen: false,
    imgUrl: '',
  },
};

export default function contentReducer(
  state: State = initialState,
  action: AnyAction
): State {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ActionTypes.OPEN_IMAGE_DETAIL:
      return { ...state, imgDetail: { isOpen: true, imgUrl: action.imgUrl } };
    case ActionTypes.CLOSE_IMAGE_DETAIL:
      return { ...state, imgDetail: { isOpen: false, imgUrl: '' } };
    case 'TEST2':
      return { ...state, test: action.payload };
    default:
      return state;
  }
}
