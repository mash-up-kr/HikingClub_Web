/* External Dependencies */
import { Record } from 'immutable';

export type RoutePOJO = number[];

export interface RouteAttr {
  latitude: number;
  longitude: number;
}

const RouteRecord = Record<RouteAttr>({
  latitude: 0,
  longitude: 0,
});

class Route extends RouteRecord {
  constructor(args: RoutePOJO) {
    const [longitude, latitude] = args;

    super({
      latitude,
      longitude,
    });
  }
}

export default Route;
