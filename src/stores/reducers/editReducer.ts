/* External Dependencies */
import { List } from 'immutable';
import { unset } from 'lodash';

/* Internal dependencies */
import ActionTypes from 'stores/ActionTypes';
import { EditActions } from 'stores/actions/editActions';
import { ContentAttr } from 'models/Content';

interface State extends Omit<ContentAttr, 'id'> {}

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
    case ActionTypes.SET_CONTENT: {
      const { content } = action.payload;
      const objectContent = content.toObject();
      unset(objectContent, 'id');

      return objectContent;
    }
    default:
      return state;
  }
}

export default editReducer;
