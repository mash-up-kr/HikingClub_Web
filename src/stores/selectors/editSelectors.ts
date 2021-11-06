/* Internal dependencies */
import { RootState } from 'stores/reducers';

export const getTitle = (state: RootState) => state.editReducer.title;

export const getHashTags = (state: RootState) =>
  state.editReducer.hashtags.toList();
