/* External Dependencies */
import axios from 'axios';

/* Internal dependencies */
import {
  RequestGetRoadPayload,
  RequestRemoveRoadPayload,
} from 'stores/actions/roadActions';
import AuthStorageService from 'services/AuthStorageService';
import { getEndpoint } from 'utils/requestUtils';

export const getRoad = ({ roadId }: RequestGetRoadPayload) => {
  return axios.get(`${getEndpoint()}/v1/apis/roads/${roadId}`, {
    headers: {
      authorization: `Bearer ${AuthStorageService.getToken()}`,
    },
  });
};

export const removeRoad = ({ roadId }: RequestRemoveRoadPayload) => {
  return axios.delete(`${getEndpoint()}/v1/apis/roads/${roadId}`, {
    headers: {
      authorization: `Bearer ${AuthStorageService.getToken()}`,
    },
  });
};
