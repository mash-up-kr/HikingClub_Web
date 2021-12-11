/* External Dependencies */
import axios from 'axios';

/* Internal dependencies */
import {
  RequestCreateRoadPayload,
  RequestUpdateRoadPayload,
  RequestGetPlacesPayload,
} from 'stores/actions/editActions';
import { getEndpoint } from 'utils/requestUtils';

export const createRoad = (payload: RequestCreateRoadPayload) => {
  return axios.post(`${getEndpoint()}/v1/apis/roads`, payload, {
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RuYWRldWwxQHRlc3QuY29tIiwic3ViIjoiNDQiLCJpYXQiOjE2MzkwNDIzNzksImV4cCI6MTY0MTYzNDM3OX0.V63tNTav52NyCqG-yeW305-sSzKKuUNTtuPLApkU9YE}`,
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
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RuYWRldWwxQHRlc3QuY29tIiwic3ViIjoiNDQiLCJpYXQiOjE2MzkwNDIzNzksImV4cCI6MTY0MTYzNDM3OX0.V63tNTav52NyCqG-yeW305-sSzKKuUNTtuPLApkU9YE`,
      },
    }
  );
};

export const getPlaces = ({ latitude, longitude }: RequestGetPlacesPayload) => {
  return axios.get(
    `${getEndpoint()}/v1/apis/places?position_y=${latitude}&position_x=${longitude}`
  );
};

export const uploadImage = (formData: FormData) => {
  return axios.post<any>(`${getEndpoint()}/v1/apis/roads/upload`, formData, {
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RuYWRldWwxQHRlc3QuY29tIiwic3ViIjoiNDQiLCJpYXQiOjE2MzkwNDIzNzksImV4cCI6MTY0MTYzNDM3OX0.V63tNTav52NyCqG-yeW305-sSzKKuUNTtuPLApkU9YE`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
