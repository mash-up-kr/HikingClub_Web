/* Internal dependencies */
import { RootState } from 'stores/reducers';

export const getTest = (state: RootState) => state.roadReducer.test;

export const getImgDetail = (state: RootState) => state.roadReducer.imgDetail;
