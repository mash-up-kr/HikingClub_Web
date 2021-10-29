/* External Dependencies */
import axios from 'axios';

/* Internal dependencies */
import { RequestGetRoadPayload } from 'stores/actions/roadActions';
import { getEndpoint } from 'utils/requestUtils';

export const getRoad = ({ roadId }: RequestGetRoadPayload) => {
  return axios.get(`${getEndpoint()}/v1/apis/roads/${roadId}`);
};
