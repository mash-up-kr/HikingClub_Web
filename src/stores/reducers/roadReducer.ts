/* External dependencies */
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

/* Internal dependencies */
import Road from 'models/Road';
import ActionTypes from 'stores/ActionTypes';

export interface State {
  test: string;
  imgDetail: {
    isOpen: boolean;
    imgUrl: string;
  };
  road: Road;
  isFetching: boolean;
  hasError: boolean;
}

export const initialState: State = {
  test: 'init',
  imgDetail: {
    isOpen: false,
    imgUrl: '',
  },
  road: new Road(),
  isFetching: false,
  hasError: false,
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

    /* TODO: (@danivelop) cors 에러가 발생하여 현재는 테스트 불가. 추후에 서버쪽에서 cors 작업후 작성예정 */
    case ActionTypes.REQUEST_GET_ROAD: {
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    }

    case ActionTypes.REQUEST_GET_ROAD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        road: new Road(action.payload),
      };
    }

    case ActionTypes.REQUEST_GET_ROAD_ERROR: {
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    }

    default:
      return state;
  }
}
