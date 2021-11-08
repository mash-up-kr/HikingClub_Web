/* External dependencies */
import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  MutableRefObject,
  Ref,
} from 'react';

import styled from 'styled-components';

import KakaoMapService from 'services/KakaoMapService';

export interface MapRef {
  mapServiceRef: MutableRefObject<KakaoMapService | undefined>;
}

function Map(_: any, forwardedRef: Ref<MapRef>) {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapServiceRef = useRef<KakaoMapService>();

  useEffect(() => {
    if (mapWrapperRef.current) {
      mapServiceRef.current = new KakaoMapService(
        mapWrapperRef.current,
        37.49796,
        127.027533
      );
      mapServiceRef.current.loadMap();
    }
  }, []);

  useImperativeHandle(forwardedRef, () => ({
    mapServiceRef,
  }));

  return <MapWrapper ref={mapWrapperRef} />;
}

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default forwardRef(Map);
