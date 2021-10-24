/* External Dependencies */
import { List } from 'immutable';
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
  hashtags: List(),
};

function editReducer(state: State = initialState, action: EditActions): State {
  switch (action.type) {
    case ActionTypes.SET_ROAD: {
      const { road } = action.payload;
      const objectRoad = road.toObject();
      unset(objectRoad, 'id');

      return objectRoad;
    }
    default:
      return state;
  }
}

export default editReducer;
