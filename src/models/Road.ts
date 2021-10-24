/* External Dependencies */
import { Record, List } from 'immutable';

/* Internal dependencies */
import Route, { RoutePOJO } from 'models/Route';
import Spot, { SpotPOJO } from 'models/Spot';

export interface RoadPOJO {
  id: string;
  title: string;
  content: string;
  distance: number;
  /* TODO: (@danivelop) place가 어떤필드인지 정확히 모르겠음. 백앤드팀에 확인필요 */
  place: null;
  category: string;
  routes: RoutePOJO[];
  spots: SpotPOJO[];
  images: string[];
  hashtags: string[];
}

export interface RoadAttr
  extends Omit<RoadPOJO, 'routes' | 'spots' | 'images' | 'hashtags'> {
  routes: List<Route>;
  spots: List<Spot>;
  images: List<string>;
  hashtags: List<string>;
}

const RoadRecord = Record<RoadAttr>({
  id: '',
  title: '',
  content: '',
  distance: 0,
  place: null,
  category: '',
  routes: List(),
  spots: List(),
  images: List(),
  hashtags: List(),
});

class Road extends RoadRecord {
  constructor(args: RoadPOJO) {
    super({
      ...args,
      routes: List<Route>().withMutations((routes) => {
        args.routes.forEach((route) => routes.push(new Route(route)));
      }),
      spots: List<Spot>().withMutations((spots) => {
        args.spots.forEach((spot) => spots.push(new Spot(spot)));
      }),
      images: List(args.images),
      hashtags: List(args.hashtags),
    });
  }
}

export default Road;
