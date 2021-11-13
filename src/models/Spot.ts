/* External Dependencies */
import { Record } from 'immutable';

interface Point {
  latitude: number;
  longitude: number;
}

export interface SpotPOJO {
  title: string;
  content: string;
  point: number[];
}

export interface SpotAttr extends Omit<SpotPOJO, 'point'> {
  point: Point;
}

const SpotRecord = Record<SpotAttr>({
  title: '',
  content: '',
  point: {
    latitude: 0,
    longitude: 0,
  },
});

class Spot extends SpotRecord {
  constructor(args: SpotPOJO) {
    const [longitude, latitude] = args.point;

    super({
      ...args,
      point: {
        latitude,
        longitude,
      },
    });
  }
}

export default Spot;
