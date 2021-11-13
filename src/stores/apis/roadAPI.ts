/* External Dependencies */
import axios from 'axios';

/* Internal dependencies */
import {
  RequestGetRoadPayload,
  RequestRemoveRoadPayload,
} from 'stores/actions/roadActions';
import { getEndpoint } from 'utils/requestUtils';

export const getRoad = ({ roadId }: RequestGetRoadPayload) => {
  return axios.get(`${getEndpoint()}/v1/apis/roads/${roadId}`, {
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQG5hdmVyLmNvbSIsInN1YiI6IjgiLCJpYXQiOjE2MzY4MjEzNDcsImV4cCI6MTYzOTQxMzM0N30.jQPZ2hZ27ka3QSeM2BJVFFk80_f6WE1rjT0u69vd5hY',
    },
  });
};

export const removeRoad = ({ roadId }: RequestRemoveRoadPayload) => {
  return axios.delete(`${getEndpoint()}/v1/apis/roads/${roadId}`, {
    headers: {},
  });
};
