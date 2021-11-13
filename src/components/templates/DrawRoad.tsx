/* External dependencies */
import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { isEmpty, isNil } from 'lodash';

/* Internal dependencies */
import { addRoute, removeRoute, clearRoute } from 'stores/actions/editActions';
import { getRoutes } from 'stores/selectors/editSelectors';
import { MouseEvent } from 'services/KakaoMapService';
import useMounted from 'hooks/useMounted';
import { getRootElement } from 'utils/domUtils';
import Header from 'components/modules/Header';
import Map, { MapRef } from 'components/atoms/Map';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';

declare global {
  interface Window {
    webkit: any;
  }
}

interface DrawRoadProps {
  show?: boolean;
  onClickBack: () => void;
}

enum DrawMode {
  Road = 'road',
  Spot = 'spot',
}

function DrawRoad({ show = false, onClickBack }: DrawRoadProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMounted = useMounted();

  const routes = useSelector(getRoutes);

  const [mode, setMode] = useState(DrawMode.Road);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [places, setPlaces] = useState<any>([]);
  const [addresses, setAddresses] = useState<string[]>([]);

  const mapRef = useRef<MapRef>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchQueryDebounceRef = useRef<any>(null);

  const handleClickMode = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const { mode: selectedMode } = event.currentTarget.dataset;
      setMode(selectedMode as DrawMode);
    },
    []
  );

  const handleChangeSearchQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setSearchQuery(value);

      if (searchQueryDebounceRef.current) {
        clearTimeout(searchQueryDebounceRef.current);
      }

      searchQueryDebounceRef.current = setTimeout(async () => {
        try {
          if (!isEmpty(value)) {
            const searchedPlaces =
              await mapRef.current?.mapServiceRef.current?.searchPlaces(value);
            setPlaces(searchedPlaces);
          }
        } catch (error) {
          /* empty handler */
        }
      }, 500);
    },
    []
  );

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleClickSearchClose = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
      setFocus(false);
    }
  }, []);

  const handleClickPlace = useCallback(
    (latitude: number, longitude: number, placeName) => {
      mapRef.current?.mapServiceRef.current?.moveTo(latitude, longitude);
      searchInputRef.current?.blur();
      setFocus(false);
      setSearchQuery(placeName);
    },
    []
  );

  const handkleClickMap = useCallback(
    async (mouseEvent: MouseEvent) => {
      const { Ma: latitude, La: longitude } = mouseEvent.latLng;
      dispatch(addRoute({ latitude, longitude }));
      mapRef.current?.mapServiceRef.current?.drawLine(latitude, longitude);

      try {
        const result: any =
          await mapRef.current?.mapServiceRef.current?.searchAddress(
            latitude,
            longitude
          );

        const address =
          result[0]?.road_address?.address_name ??
          result[0]?.address?.address_name ??
          '';
        const region = result[0]?.address?.region_3depth_name;

        setAddresses((prev) => [
          ...prev,
          `${address}${region ? ` (${region})` : ''}`,
        ]);
      } catch (error) {
        /* empty handler */
      }
    },
    [dispatch]
  );

  const handleClickClearRoad = useCallback(() => {
    dispatch(clearRoute());
    setAddresses([]);
    mapRef.current?.mapServiceRef.current?.removeAllLines();
  }, [dispatch]);

  const handleClickRevertRoad = useCallback(() => {
    dispatch(removeRoute());
    setAddresses((prev) => prev.slice(0, prev.length - 1));
    mapRef.current?.mapServiceRef.current?.removeLastLine();
  }, [dispatch]);

  const handleClickClose = useCallback(() => {
    if (window.webkit) {
      window.webkit.messageHandlers.handler.postMessage({
        function: 'close',
      });
    }
    router.back();
  }, [router]);

  const DrawModeComponent = useMemo(
    () => (
      <>
        {!isFocus && (
          <DrawModeDescription>
            지도를 터치해 길을 그려주세요.
          </DrawModeDescription>
        )}
        {routes.size === 0 && (
          <>
            <SearchWrapper>
              <SearchInput
                ref={searchInputRef}
                value={searchQuery}
                placeholder="장소, 주소, 지하철 검색"
                leftContent={<SearchIcon src="/images/search-icon.png" />}
                onChange={handleChangeSearchQuery}
                onFocus={handleFocus}
              />
              {isFocus && (
                <SearchCloseButton onClick={handleClickSearchClose}>
                  취소
                </SearchCloseButton>
              )}
            </SearchWrapper>
            {!isFocus && (
              <SearchDescription>
                검색한 위치로 지도가 이동합니다.
              </SearchDescription>
            )}
            {isFocus && (
              <MovePositionButton>현재위치로 이동</MovePositionButton>
            )}
            {isFocus && (
              <PlaceList>
                {places.map((place: any) => (
                  <PlaceItem
                    key={place.id}
                    onClick={() =>
                      handleClickPlace(place.y, place.x, place.place_name)
                    }
                  >
                    <PlaceName>{place.place_name}</PlaceName>
                    <PlaceAddress>{place.road_address_name}</PlaceAddress>
                  </PlaceItem>
                ))}
              </PlaceList>
            )}
          </>
        )}
        {routes.size !== 0 && (
          <RouteList>
            {addresses.map((address, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <EmptyRouteSpace />}
                <RouteWrapper>
                  <LeftRouteContent>
                    {(() => {
                      if (index === 0) return '출발';
                      if (index === addresses.length - 1) return '도착';
                      return <RouteCircle />;
                    })()}
                  </LeftRouteContent>
                  <Route>{address}</Route>
                </RouteWrapper>
              </React.Fragment>
            ))}
          </RouteList>
        )}
      </>
    ),
    [
      addresses,
      handleChangeSearchQuery,
      handleClickPlace,
      handleClickSearchClose,
      handleFocus,
      isFocus,
      places,
      routes.size,
      searchQuery,
    ]
  );

  const SpotModeComponent = useMemo(() => null, []);

  const DrawRoadComponent = useMemo(
    () => (
      <Container show={show}>
        <Header
          title="길 그리기"
          showBackIcon
          showCloseIcon
          onClickBack={onClickBack}
          onClickClose={handleClickClose}
        />
        <MapWrapper>
          <Map ref={mapRef} onClickMap={handkleClickMap} />
          <MapOptioWrapper>
            <MapOption onClick={handleClickClearRoad}>
              <img src="/images/trash.png" width="36" height="36" alt="" />
            </MapOption>
            <MapOption onClick={handleClickRevertRoad}>
              <img src="/images/revert.png" width="36" height="36" alt="" />
            </MapOption>
          </MapOptioWrapper>
        </MapWrapper>
        <ContentCardWrapper isFocus={isFocus}>
          <ContentCard>
            {!isFocus && (
              <MenuWrapper>
                <MenuItem
                  data-mode={DrawMode.Road}
                  active={mode === DrawMode.Road}
                  onClick={handleClickMode}
                >
                  길 그리기
                </MenuItem>
                <MenuItem
                  data-mode={DrawMode.Spot}
                  active={mode === DrawMode.Spot}
                  onClick={handleClickMode}
                >
                  스페셜 스팟
                </MenuItem>
              </MenuWrapper>
            )}
            <ContentWrapper>
              {mode === DrawMode.Road ? DrawModeComponent : SpotModeComponent}
            </ContentWrapper>
            {!isFocus && <SubmitButton>완료</SubmitButton>}
          </ContentCard>
        </ContentCardWrapper>
      </Container>
    ),
    [
      DrawModeComponent,
      SpotModeComponent,
      handkleClickMap,
      handleClickClearRoad,
      handleClickClose,
      handleClickMode,
      handleClickRevertRoad,
      isFocus,
      mode,
      onClickBack,
      show,
    ]
  );

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    setTimeout(() => {
      mapRef.current?.mapServiceRef.current?.resizeMap();
    }, 500);
  }, [isFocus]);

  useEffect(() => {
    if (isMounted) {
      mapRef.current?.mapServiceRef.current?.drawlines(routes.toArray());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const firstRoutes = routes.get(0);
      if (!isNil(firstRoutes)) {
        mapRef.current?.mapServiceRef.current?.moveTo(
          firstRoutes.latitude,
          firstRoutes.longitude
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(DrawRoadComponent, getRootElement());
}

const Container = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  background-color: white;

  ${({ show }) =>
    show &&
    css`
      transform: translateY(0%);
    `}
`;

const MapWrapper = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
`;

const MapOptioWrapper = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  justify-content: space-between;
  z-index: 1000000;
`;

const MapOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.32);

  img {
    width: 60%;
    height: 60%;
  }

  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const ContentCardWrapper = styled.div<{ isFocus: boolean }>`
  width: 100%;
  height: 304px;
  background-color: #f0eee5;
  transition: height 0.3s ease;

  ${({ isFocus }) =>
    isFocus &&
    css`
      height: 360px;
    `}
`;

const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 16px 16px 0 0;
`;

const MenuWrapper = styled.ul`
  display: flex;
  margin-top: 20px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const MenuItem = styled.li<{ active: boolean }>`
  position: relative;
  font-size: 13px;
  font-weight: 600;
  color: #c8c7c7;
  box-sizing: border-box;

  ${({ active }) =>
    active &&
    css`
      color: #2c7a50;
    `}

  &:not(&:first-of-type) {
    padding-left: 8px;
  }

  &:not(&:last-of-type) {
    padding-right: 8px;
  }

  &:not(&:first-of-type):before {
    position: absolute;
    top: -20%;
    left: 0;
    content: '';
    width: 1px;
    height: 16px;
    border-left: 1px solid #c8c7c7;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

const SubmitButton = styled(Button)`
  width: unset;
  margin: 0 16px 20px;
  box-sizing: border-box;
`;

/* 길 그리기 */
const DrawModeDescription = styled.p`
  margin-top: 20px;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 600;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const SearchInput = styled(Input)`
  height: 48px;
  overflow: hidden;
  font-size: 16px;
  border-radius: 8px;
`;

const SearchIcon = styled.img`
  display: block;
  width: 24px;
  height: 24px;
`;

const SearchDescription = styled.p`
  margin-top: 8px;
  padding: 0 16px;
  box-sizing: border-box;
  color: #868686;
  font-size: 12px;
  font-weight: 500;
`;

const SearchCloseButton = styled.p`
  min-width: 32px;
  padding-right: 5px;
  text-align: right;
  font-size: 14px;
  font-weight: 500px;
`;

const MovePositionButton = styled(Button)`
  width: unset;
  height: 44px;
  min-height: 44px;
  margin: 12px 16px 0;
  box-sizing: border-box;
`;

const PlaceList = styled.ul`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

const PlaceItem = styled.li`
  padding: 14px 16px 16px;
  border-bottom: 1px solid #e4e4e4;
`;

const PlaceName = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const PlaceAddress = styled.p`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #868686;
`;

const RouteList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  padding: 0 16px 20px;
  box-sizing: border-box;
`;

const RouteWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 0;

  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
`;

const Route = styled.p`
  flex: 1;
  min-width: max-content;
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  color: #5d5d5d;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LeftRouteContent = styled.p`
  display: flex;
  justify-content: center;
  min-width: 42px;
  padding: 0 15px 0 6px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 500;
  color: #2c7a50;
`;

const RouteCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9px;
  height: 9px;
  background-color: #2c7a50;
  border: 3px solid #b8d8c7;
  border-radius: 50%;
`;

const EmptyRouteSpace = styled.div`
  height: 36px;
  margin: 0 16px;
  border-left: 1px solid #2c7a50;
`;

export default DrawRoad;
