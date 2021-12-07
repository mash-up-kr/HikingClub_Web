/* External Dependencies */
import { Record, List, OrderedSet } from 'immutable';

/* Internal dependencies */
import Route, { RoutePOJO } from 'models/Route';
import Spot, { SpotPOJO } from 'models/Spot';

export interface RoadPOJO {
  id: string;
  title: string;
  content: string;
  distance: number;
  place: string | null;
  category: string;
  routes: RoutePOJO[];
  spots: SpotPOJO[];
  images: string[];
  hashtags: string[];
  is_mine: boolean;
}

export interface RoadAttr
  extends Omit<
    RoadPOJO,
    'routes' | 'spots' | 'images' | 'hashtags' | 'is_mine'
  > {
  routes: List<Route>;
  spots: List<Spot>;
  images: List<string>;
  hashtags: OrderedSet<string>;
  isMine: boolean;
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
  hashtags: OrderedSet(),
  isMine: false,
});

class Road extends RoadRecord {
  constructor(args: Partial<RoadPOJO> = {}) {
    super({
      ...args,
      routes: List<Route>().withMutations((routes) => {
        args.routes?.forEach((route) => routes.push(new Route(route)));
      }),
      spots: List<Spot>().withMutations((spots) => {
        args.spots?.forEach((spot) => spots.push(new Spot(spot)));
      }),
      images: List(args.images),
      hashtags: OrderedSet(args.hashtags),
      isMine: args.is_mine,
    });
  }
}

export default Road;
