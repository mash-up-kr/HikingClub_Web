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
      return {
        ...state,
        imgDetail: { isOpen: true, imgUrl: action.payload.imgUrl },
      };

    case ActionTypes.CLOSE_IMAGE_DETAIL:
      return { ...state, imgDetail: { isOpen: false, imgUrl: '' } };

    case 'TEST2':
      return { ...state, test: action.payload };

    /* TODO: (@danivelop) cors 에러가 발생하여 현재는 테스트 불가. 추후에 서버쪽에서 cors 작업후 작성예정 */
    case ActionTypes.REQUEST_GET_ROAD: {
      console.log('REQUEST_GET_ROAD');
      return state;
    }

    case ActionTypes.REQUEST_GET_ROAD_SUCCESS: {
      console.log('REQUEST_GET_ROAD_SUCCESS');
      return state;
    }

    case ActionTypes.REQUEST_GET_ROAD_ERROR: {
      console.log('REQUEST_GET_ROAD_ERROR');
      return state;
    }

    default:
      return state;
  }
}
