/* Internal dependencies */
import { RootState } from 'stores/reducers';

export const getTest = (state: RootState) => state.contentReducer.test;

export const getImgDetail = (state: RootState) =>
  state.contentReducer.imgDetail;
