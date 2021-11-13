/* External Dependencies */
import { List, OrderedSet } from 'immutable';
import { unset } from 'lodash';

/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import { EditActions } from 'stores/actions/editActions';
import { RoadAttr } from 'models/Road';
import Route from 'models/Route';
import Spot from 'models/Spot';

interface State extends Omit<RoadAttr, 'id'> {
  isFetching: boolean;
  hasSuccess: boolean;
  hasError: boolean;
  roadId: string;
}

const initialState: State = {
  title: '',
  content: '',
  distance: 0,
  place: null,
  category: '',
  routes: List(),
  spots: List(),
  images: List(),
  hashtags: OrderedSet(),

  isFetching: false,
  hasSuccess: false,
  hasError: false,
  roadId: '',
};

const mock = [
  {
    title: '공원입구',
    content: '여기 공원 입구에서 사진 찍으면 이뻐요!',
  },
  {
    title: '한강공원',
    content: '야경이 너무 이뻐요~!',
  },
  {
    title: '경리단길',
    content: '연인끼리 가서 사진찍기 진짜 좋아요!',
  },
  {
    title: '석촌호수공원',
    content: '벚꽃필땐 여기가 최고죠!! 근데 사람이 너무 많아요ㅠㅠ',
  },
];

let mockIndex = 0;

function editReducer(state: State = initialState, action: EditActions): State {
  switch (action.type) {
    case ActionTypes.SET_ROAD: {
      const { road } = action.payload;
      const objectRoad = road.toObject();
      unset(objectRoad, 'id');

      return {
        ...state,
        ...objectRoad,
      };
    }
    case ActionTypes.SET_TITLE: {
      const { title } = action.payload;

      return {
        ...state,
        title,
      };
    }
    case ActionTypes.ADD_HASHTAG: {
      const { hashTag } = action.payload;

      return {
        ...state,
        hashtags: state.hashtags.add(hashTag),
      };
    }
    case ActionTypes.REMOVE_HASHTAG: {
      const { hashTag } = action.payload;

      return {
        ...state,
        hashtags: state.hashtags.remove(hashTag),
      };
    }
    case ActionTypes.SET_CONTENT: {
      const { content } = action.payload;

      return {
        ...state,
        content,
      };
    }
    case ActionTypes.ADD_ROUTE: {
      const { latitude, longitude } = action.payload;

      return {
        ...state,
        routes: state.routes.push(new Route([longitude, latitude])),
      };
    }
    case ActionTypes.REMOVE_ROUTE: {
      return {
        ...state,
        routes: state.routes.pop(),
      };
    }
    case ActionTypes.CLEAR_ROUTE: {
      return {
        ...state,
        routes: state.routes.clear(),
      };
    }
    case ActionTypes.ADD_SPOT: {
      const { latitude, longitude } = action.payload;
      mockIndex += 1;

      return {
        ...state,
        spots: state.spots.push(
          new Spot({
            title: mock[mockIndex % 4].title,
            content: mock[mockIndex % 4].content,
            point: [longitude, latitude],
          })
        ),
      };
    }
    case ActionTypes.REMOVE_SPOT: {
      const { index } = action.payload;

      return {
        ...state,
        spots: state.spots.delete(index),
      };
    }
    case ActionTypes.INITIALIZE: {
      return {
        ...state,
        isFetching: false,
        hasSuccess: false,
        hasError: false,
        roadId: '',
      };
    }
    case ActionTypes.REQUEST_CREATE_ROAD: {
      return {
        ...state,
        isFetching: true,
        hasSuccess: false,
        hasError: false,
        roadId: '',
      };
    }
    case ActionTypes.REQUEST_CREATE_ROAD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        hasSuccess: true,
        roadId: action.payload.id,
      };
    }
    case ActionTypes.REQUEST_CREATE_ROAD_ERROR: {
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    }
    case ActionTypes.REQUEST_UPDATE_ROAD: {
      return {
        ...state,
        isFetching: true,
        hasSuccess: false,
        hasError: false,
        roadId: '',
      };
    }
    case ActionTypes.REQUEST_UPDATE_ROAD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        hasSuccess: true,
        roadId: action.payload.id,
      };
    }
    case ActionTypes.REQUEST_UPDATE_ROAD_ERROR: {
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

export default editReducer;
