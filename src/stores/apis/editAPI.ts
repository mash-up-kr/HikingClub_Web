/* External Dependencies */
import axios from 'axios';

/* Internal dependencies */
import {
  RequestCreateRoadPayload,
  RequestUpdateRoadPayload,
  RequestGetPlacesPayload,
} from 'stores/actions/editActions';
import AuthStorageService from 'services/AuthStorageService';
import { getEndpoint } from 'utils/requestUtils';

export const createRoad = (payload: RequestCreateRoadPayload) => {
  return axios.post(`${getEndpoint()}/v1/apis/roads`, payload, {
    headers: {
      authorization: `Bearer ${AuthStorageService.getToken()}`,
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
        authorization: `Bearer ${AuthStorageService.getToken()}`,
      },
    }
  );
};

export const getPlaces = ({ latitude, longitude }: RequestGetPlacesPayload) => {
  return axios.get(
    `${getEndpoint()}/v1/apis/places?position_y=${latitude}&position_x=${longitude}`
  );
};
