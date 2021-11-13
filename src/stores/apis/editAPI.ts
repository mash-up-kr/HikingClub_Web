/* External Dependencies */
import axios from 'axios';

/* Internal dependencies */
import {
  RequestCreateRoadPayload,
  RequestUpdateRoadPayload,
} from 'stores/actions/editActions';
import { getEndpoint } from 'utils/requestUtils';

export const crearteRoad = (payload: RequestCreateRoadPayload) => {
  return axios.post(`${getEndpoint()}/v1/apis/roads`, payload, {
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQG5hdmVyLmNvbSIsInN1YiI6IjgiLCJpYXQiOjE2MzY4MjEzNDcsImV4cCI6MTYzOTQxMzM0N30.jQPZ2hZ27ka3QSeM2BJVFFk80_f6WE1rjT0u69vd5hY',
    },
  });
};

export const updateRoad = (payload: RequestUpdateRoadPayload) => {
  return axios.put(
    `${getEndpoint()}/v1/apis/roads/${payload.roadId}`,
    {
      ...payload,
      roadId: undefined,
    },
    {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQG5hdmVyLmNvbSIsInN1YiI6IjgiLCJpYXQiOjE2MzY4MjEzNDcsImV4cCI6MTYzOTQxMzM0N30.jQPZ2hZ27ka3QSeM2BJVFFk80_f6WE1rjT0u69vd5hY',
      },
    }
  );
};
