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
import { noop } from 'lodash';

/* Internal dependencies */
import KakaoMapService, { MouseEvent } from 'services/KakaoMapService';

export interface MapRef {
  mapServiceRef: MutableRefObject<KakaoMapService | undefined>;
}

interface MapProps {
  latitude?: number;
  longitude?: number;
  onClickMap?: (mouseEvent: MouseEvent) => void;
}

function Map(
  { latitude = 37.49796, longitude = 127.027533, onClickMap = noop }: MapProps,
  forwardedRef: Ref<MapRef>
) {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapServiceRef = useRef<KakaoMapService>();

  useEffect(() => {
    if (mapWrapperRef.current) {
      mapServiceRef.current = new KakaoMapService(
        mapWrapperRef.current,
        latitude,
        longitude
      );
      mapServiceRef.current.loadMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapServiceRef.current) {
      mapServiceRef.current.addClickEventListener(onClickMap);
    }
  }, [onClickMap]);

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
