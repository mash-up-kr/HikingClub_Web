/* Internal dependencies */
import { RootState } from 'stores/reducers';

export const getTitle = (state: RootState) => state.editReducer.title;

export const getContent = (state: RootState) => state.editReducer.content;

export const getDistance = (state: RootState) => state.editReducer.distance;

export const getHashTags = (state: RootState) =>
  state.editReducer.hashtags.toList();

export const getRoutes = (state: RootState) => state.editReducer.routes;

export const getSpots = (state: RootState) => state.editReducer.spots;

export const getImages = (state: RootState) => state.editReducer.images;

export const getRoadId = (state: RootState) => state.editReducer.roadId;

export const getSuccess = (state: RootState) => state.editReducer.hasSuccess;

export const getCategoryId = (state: RootState) => state.editReducer.categoryId;
