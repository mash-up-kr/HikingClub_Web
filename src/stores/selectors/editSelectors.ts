/* Internal dependencies */
import { RootState } from 'stores/reducers';

export const getTitle = (state: RootState) => state.editReducer.title;

export const getHashTags = (state: RootState) =>
  state.editReducer.hashtags.toList();

export const getContent = (state: RootState) => state.editReducer.content;

export const getRoutes = (state: RootState) => state.editReducer.routes;
