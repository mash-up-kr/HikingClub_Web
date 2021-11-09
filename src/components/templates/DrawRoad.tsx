/* External dependencies */
import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { isEmpty } from 'lodash';

/* Internal dependencies */
import useMounted from 'hooks/useMounted';
import { getRootElement } from 'utils/domUtils';
import Header from 'components/modules/Header';
import Map, { MapRef } from 'components/atoms/Map';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';

interface DrawRoadProps {
  onClickCloseMap: () => void;
}

enum DrawMode {
  Road = 'road',
  Spot = 'spot',
}

function DrawRoad({ onClickCloseMap }: DrawRoadProps) {
  const isMounted = useMounted();

  const [mode, setMode] = useState(DrawMode.Road);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [places, setPlaces] = useState<any>([]);

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
              await mapRef.current?.mapServiceRef.current?.searchPlace(value);
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

  const DrawModeComponent = useMemo(
    () => (
      <>
        {!isFocus && (
          <DrawModeDescription>
            지도를 터치해 길을 그려주세요.
          </DrawModeDescription>
        )}
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
        {isFocus && <MovePositionButton>현재위치로 이동</MovePositionButton>}
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
    ),
    [
      handleChangeSearchQuery,
      handleClickPlace,
      handleClickSearchClose,
      handleFocus,
      isFocus,
      places,
      searchQuery,
    ]
  );

  const SpotModeComponent = useMemo(() => null, []);

  const DrawRoadComponent = useMemo(
    () => (
      <Container>
        <Header
          title="길 그리기"
          showBackIcon
          showCloseIcon
          onClickClose={onClickCloseMap}
        />
        <MapWrapper>
          <Map ref={mapRef} />
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
      handleClickMode,
      isFocus,
      mode,
      onClickCloseMap,
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

  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(DrawRoadComponent, getRootElement());
}

const slide = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  animation: ${slide} 0.3s ease;
  background-color: white;
`;

const MapWrapper = styled.div`
  flex: 1;
  width: 100%;
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

export default DrawRoad;
