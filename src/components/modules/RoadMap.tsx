/* External dependencies */
import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { isNil } from 'lodash';

/* Internal dependencies */
import { getRoutes, getSpots } from 'stores/selectors/editSelectors';
import { requestMapTimeout } from 'constants/requestTimeout';
import { getQueryParam } from 'utils/urlUtils';
import DrawRoad from 'components/templates/DrawRoad';
import Map, { MapRef } from 'components/atoms/Map';

function RoadMap() {
  const routes = useSelector(getRoutes);
  const spots = useSelector(getSpots);

  const [enableDrawRoad, setEnableDrawRoad] = useState(false);

  const mapRef = useRef<MapRef>(null);

  const handleClickMap = useCallback(() => {
    setEnableDrawRoad(true);
  }, []);

  const handleClickBack = useCallback(() => {
    setEnableDrawRoad(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.mapServiceRef.current?.drawLines(routes.toArray());
    }, requestMapTimeout);
  }, [routes]);

  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.mapServiceRef.current?.addMarkers(
        spots.toArray().map((spot) => ({
          latitude: spot.point.latitude,
          longitude: spot.point.longitude,
        }))
      );
    }, requestMapTimeout);
  }, [spots]);

  useEffect(() => {
    if (!enableDrawRoad) {
      const firstRoutes = routes.get(0);
      if (!isNil(firstRoutes)) {
        setTimeout(() => {
          mapRef.current?.mapServiceRef.current?.moveTo(
            firstRoutes.latitude,
            firstRoutes.longitude
          );
          mapRef.current?.mapServiceRef.current?.removeCurrentLocationMarker();
        }, requestMapTimeout);
      } else {
        const latitude = getQueryParam('lat');
        const longitude = getQueryParam('long');

        if (!isNil(latitude) && !isNil(longitude)) {
          setTimeout(() => {
            mapRef.current?.mapServiceRef.current?.moveTo(
              Number(latitude),
              Number(longitude)
            );
            mapRef.current?.mapServiceRef.current?.addCurrentLocationMarker(
              Number(latitude),
              Number(longitude)
            );
          }, requestMapTimeout);
        }
      }
    }
  }, [enableDrawRoad, routes]);

  return (
    <>
      <Wrapper onClick={handleClickMap}>
        <Title>길 그리기</Title>
        <MapWrapper>
          <Map ref={mapRef} />
        </MapWrapper>
        <Description>지도를 눌러 길을 그려주세요.</Description>
      </Wrapper>
      <DrawRoad show={enableDrawRoad} onClickBack={handleClickBack} />
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 36px;
`;

const Title = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 20px;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 144px;
  overflow: hidden;
  border-radius: 8px;
`;

const Description = styled.p`
  margin-top: 14px;
  font-size: 14px;
  color: #868686;
`;

export default RoadMap;
