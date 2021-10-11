import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionTypes } from '../actions';

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

export const reducer = (state: State = initialState, action: AnyAction) => {
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
};

// export const rootReducer = combineReducers({ reducer });

// export type RootState = ReturnType<typeof rootReducer>;
