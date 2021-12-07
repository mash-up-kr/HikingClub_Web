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
  errorMessage: string;
  roadId: string;
  categoryId: number;
  placeCode: string;

  isFetchingPlaces: boolean;
  hasSuccessPlaces: boolean;
  hasErrorPlaces: boolean;
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
  errorMessage: '',
  roadId: '',
  categoryId: 0,
  placeCode: '',

  isFetchingPlaces: false,
  hasSuccessPlaces: false,
  hasErrorPlaces: false,
};

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

      return {
        ...state,
        spots: state.spots.push(
          new Spot({
            title: '',
            content: '',
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

    case ActionTypes.ADD_CATEGORY: {
      const { categoryId } = action.payload;

      return {
        ...state,
        categoryId,
      };
    }

    case ActionTypes.CHANGE_SPOT_TITLE: {
      const { index, title } = action.payload;

      return {
        ...state,
        spots: state.spots.setIn([index, 'title'], title),
      };
    }
    case ActionTypes.CHANGE_SPOT_CONTENT: {
      const { index, content } = action.payload;

      return {
        ...state,
        spots: state.spots.setIn([index, 'content'], content),
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
        errorMessage: action.payload?.message?.[0],
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
        errorMessage: action.payload?.message?.[0],
      };
    }
    case ActionTypes.REQUEST_GET_PLACES: {
      return {
        ...state,
        isFetchingPlaces: true,
        hasErrorPlaces: false,
      };
    }
    case ActionTypes.REQUEST_GET_PLACES_SUCCESS: {
      return {
        ...state,
        placeCode: action.payload[0].code,
        isFetchingPlaces: false,
        hasSuccessPlaces: true,
      };
    }
    case ActionTypes.REQUEST_GET_PLACES_ERROR: {
      return {
        ...state,
        isFetchingPlaces: false,
        hasErrorPlaces: true,
      };
    }

    default:
      return state;
  }
}

export default editReducer;
