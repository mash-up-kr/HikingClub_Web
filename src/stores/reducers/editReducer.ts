/* External Dependencies */
import { List, Set } from 'immutable';
import { unset } from 'lodash';

/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import { EditActions } from 'stores/actions/editActions';
import { RoadAttr } from 'models/Road';

interface State extends Omit<RoadAttr, 'id'> {}

const initialState: State = {
  title: '',
  content: '',
  distance: 0,
  place: null,
  category: '',
  routes: List(),
  spots: List(),
  images: List(),
  hashtags: Set(),
};

function editReducer(state: State = initialState, action: EditActions): State {
  switch (action.type) {
    case ActionTypes.SET_ROAD: {
      const { road } = action.payload;
      const objectRoad = road.toObject();
      unset(objectRoad, 'id');

      return objectRoad;
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
    default:
      return state;
  }
}

export default editReducer;
