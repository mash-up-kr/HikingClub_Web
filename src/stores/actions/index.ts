export enum ActionTypes {
  OPEN_IMAGE_DETAIL = 'OPEN_IMAGE_DETAIL',
  CLOSE_IMAGE_DETAIL = 'CLOSE_IMAGE_DETAIL',
}

export const openImageDetail = (imgUrl: string) => ({
  type: ActionTypes.OPEN_IMAGE_DETAIL,
  imgUrl,
});

export const closeImageDetail = () => ({
  type: ActionTypes.CLOSE_IMAGE_DETAIL,
});
