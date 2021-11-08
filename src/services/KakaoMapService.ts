/* External dependencies */
import { isEmpty, isFunction } from 'lodash';

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

interface MouseEvent {
  latLng: LatLng;
}

class KakaoMapService implements KakaoMapServiceProps {
  map: any;

  ps: any = null;

  linePath: any[] = [];

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

  async searchPlace(keyword: string) {
    try {
      if (isEmpty(window.kakao)) {
        await this.loadScript();
      }

      if (isEmpty(this.ps)) {
        this.ps = new window.kakao.maps.services.Places();
      }

      return await new Promise((resolve) => {
        this.ps.keywordSearch(keyword, (data: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(data);
          }
        });
      });
    } catch (error) {
      /* empty handler */
      return Promise.reject(error);
    }
  }

  getMap() {
    return this.map;
  }

  moveTo(latitude: number, longitude: number) {
    const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude);
    this.map.panTo(moveLatLon);
  }

  addClickEventListener(onClick: MouseEvent) {
    window.kakao.maps.event.addListener(this.map, 'click', onClick);
  }

  drawLine(lat: number, lng: number) {
    this.linePath.push(new window.kakao.maps.LatLng(lat, lng));

    const polyline = new window.kakao.maps.Polyline({
      path: this.linePath,
      strokeWeight: 4,
      strokeColor: '#3C524A',
      strokeOpacity: 1,
      strokeStyle: 'solid',
    });

    polyline.setMap(this.map);
  }

  resizeMap() {
    if (isFunction(this.map?.relayout)) {
      this.map.relayout();
    }
  }
}

export default KakaoMapService;
