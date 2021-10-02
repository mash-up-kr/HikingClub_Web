import { useRef, useEffect } from 'react';

import styled from 'styled-components';

import KakaoMapService from 'services/KakaoMapService';

function Map() {
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

  return <MapWrapper ref={mapWrapperRef} />;
}

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Map;
