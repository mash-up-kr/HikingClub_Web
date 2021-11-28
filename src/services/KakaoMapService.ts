/* External dependencies */
import { isEmpty, isFunction, isNil } from 'lodash';

interface KakaoMapServiceProps {
  map: any;
  mapWrapper: any;
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

interface LatLng {
  Ma: number;
  La: number;
}

interface Route {
  latitude: number;
  longitude: number;
}

interface Spot {
  latitude: number;
  longitude: number;
}

export interface MouseEvent {
  latLng: LatLng;
}

class KakaoMapService implements KakaoMapServiceProps {
  map: any;

  onClick: ((mouseEvent: MouseEvent) => void) | null = null;

  linePath: any[] = [];

  polyLines: any[] = [];

  circles: any[] = [];

  spots: any[] = [];

  ps: any = null;

  geocoder: any = null;

  markerImage: any = null;

  markerInitialized: boolean = false;

  readonly mapWrapper: HTMLDivElement;

  readonly latitude: number;

  readonly longitude: number;

  constructor(mapWrapper: HTMLDivElement, latitude: number, longitude: number) {
    this.mapWrapper = mapWrapper;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  private async loadScript() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.async = true;
      script.src =
        'https://dapi.kakao.com/v2/maps/sdk.js?appkey=785039beb98fa410f1c187bbb9cbe63b&autoload=false&libraries=drawing,services';
      document.head.appendChild(script);

      script.onload = () => {
        resolve(undefined);
      };
    });
  }

  async loadMap() {
    try {
      if (isEmpty(window.kakao)) {
        await this.loadScript();
      }

      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(this.latitude, this.longitude),
          level: 7,
        };
        this.map = new window.kakao.maps.Map(this.mapWrapper, options);
      });
    } catch (error) {
      /* empty handler */
    }
  }

  async searchPlaces(keyword: string) {
    try {
      if (isEmpty(window.kakao)) {
        await this.loadScript();
      }

      if (isEmpty(this.ps)) {
        this.ps = new window.kakao.maps.services.Places();
      }

      return await new Promise((resolve) => {
        this.ps.keywordSearch(keyword, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(result);
          }
        });
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async searchAddress(latitude: number, longitude: number) {
    try {
      if (isEmpty(window.kakao)) {
        await this.loadScript();
      }

      if (isEmpty(this.geocoder)) {
        this.geocoder = new window.kakao.maps.services.Geocoder();
      }

      return await new Promise((resolve) => {
        this.geocoder.coord2Address(
          longitude,
          latitude,
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              resolve(result);
            }
          }
        );
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getMap() {
    return this.map;
  }

  async moveTo(latitude: number, longitude: number) {
    try {
      if (isEmpty(window.kakao)) {
        await this.loadScript();
      }

      const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude);
      this.map.panTo(moveLatLon);
    } catch (error) {
      /* empty handler */
    }
  }

  async addClickEventListener(onClick: (mouseEvent: MouseEvent) => void) {
    if (isEmpty(this.map)) {
      setTimeout(() => {
        this.addClickEventListener(onClick);
      }, 300);
    } else {
      window.kakao.maps.event.removeListener(this.map, 'click', this.onClick);
      window.kakao.maps.event.addListener(this.map, 'click', onClick);

      this.onClick = onClick;
    }
  }

  drawLine(latitude: number, longitude: number) {
    const newRoute = new window.kakao.maps.LatLng(latitude, longitude);

    const circle = new window.kakao.maps.Circle({
      center: newRoute,
      radius: 8,
      strokeWeight: 5,
      strokeColor: '#2C7A50',
      strokeOpacity: 0.3,
      strokeStyle: 'solid',
      fillColor: '#2C7A50',
      fillOpacity: 1,
    });

    this.linePath.push(newRoute);
    this.circles.push(circle);

    circle.setMap(this.map);

    if (this.linePath.length >= 2) {
      const polyline = new window.kakao.maps.Polyline({
        path: this.linePath.slice(this.linePath.length - 2),
        strokeWeight: 4,
        strokeColor: '#2C7A50',
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      this.polyLines.push(polyline);

      polyline.setMap(this.map);
    }
  }

  async drawLines(routes: Route[]) {
    try {
      if (isEmpty(window.kakao)) {
        await this.loadScript();
      }

      this.removeAllLines();

      routes.forEach((route) => {
        this.drawLine(route.latitude, route.longitude);
      });
    } catch (error) {
      /* empty handler */
    }
  }

  async initializeMarker() {
    try {
      if (isEmpty(window.kakao)) {
        await this.loadScript();
      }

      const imageSrc: string =
        'https://user-images.githubusercontent.com/55433950/141651913-86a31db8-b6b4-4670-a045-967f92078def.png';
      const imageSize = new window.kakao.maps.Size(24, 24);
      const imageOption = { offset: new window.kakao.maps.Point(10.6, 12) };

      this.markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      this.markerInitialized = true;
    } catch (error) {
      /* empty handler */
    }
  }

  async addMarker(latitude: number, longitude: number) {
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: this.markerImage,
    });

    marker.setMap(this.map);
    this.spots.push(marker);
  }

  async addMarkers(spots: Spot[]) {
    if (!this.markerInitialized) {
      try {
        await this.initializeMarker();
      } catch (error) {
        /* empty handler */
      }
    }

    this.removeAllMarkers();

    spots.forEach((spot) => {
      this.addMarker(spot.latitude, spot.longitude);
    });
  }

  removeLastLine() {
    const lastCircle = this.circles.pop();
    const lastPolyline = this.polyLines.pop();

    if (!isNil(lastCircle)) {
      lastCircle.setMap(null);
    }
    if (!isNil(lastPolyline)) {
      lastPolyline.setMap(null);
    }

    this.linePath.pop();
  }

  removeAllLines() {
    while (
      this.linePath.length ||
      this.circles.length ||
      this.polyLines.length
    ) {
      this.removeLastLine();
    }
  }

  removeMarker(index: number) {
    const marker = this.spots.splice(index, 1)?.[0];

    if (!isNil(marker)) {
      marker.setMap(null);
    }
  }

  removeAllMarkers() {
    while (this.spots.length) {
      this.removeMarker(this.spots.length - 1);
    }
  }

  resizeMap() {
    if (isFunction(this.map?.relayout)) {
      this.map.relayout();
    }
  }
}

export default KakaoMapService;
