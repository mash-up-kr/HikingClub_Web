/* External dependencies */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { isNil } from 'lodash';

/* Internal dependencies */
import { wrapper } from 'stores';
import { openSnackbar } from 'stores/actions/layoutActions';
import {
  getRoad,
  getImgDetail,
  getRemoveRoadSuccess,
} from 'stores/selectors/roadSelectors';
import { requestGetRoad, requestRemoveRoad } from 'stores/actions/roadActions';
import { setRoad } from 'stores/actions/editActions';
import AuthStorageService from 'services/AuthStorageService';
import useMounted from 'hooks/useMounted';
import { requestMapTimeout } from 'constants/requestTimeout';
import { getQueryParam } from 'utils/urlUtils';
import Map, { MapRef } from 'components/atoms/Map';
import Layout from 'components/Layout';
import BottomSheet from 'components/templates/BottomSheet';
import ImageDetail from 'components/modules/ImageDetail';
import { Overlay, OverlayPosition } from 'components/modules/Overlay';

interface BottomSheetWrapperProps {
  status: number;
}

const Detail: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMounted = useMounted();

  const imgDetail = useSelector(getImgDetail);
  const road = useSelector(getRoad);
  const hasRemoveRoadSuccess = useSelector(getRemoveRoadSuccess);

  const { isOpen, imgUrl } = imgDetail;

  // 0 축소 1 기본 2 확장
  const [bottomSheetStatus, setBottomSheetStatus] = useState(1);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [showMenum, setShowMenu] = useState(false);
  const [roadId, setRoadId] = useState('');

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const roadIdFromQueryParam = getQueryParam('roadId');
    if (!isNil(roadIdFromQueryParam)) {
      dispatch(requestGetRoad({ roadId: roadIdFromQueryParam }));
      setRoadId(roadIdFromQueryParam);
    }
  }, [dispatch]);

  const handleClickMapWrapper = () => {
    setBottomSheetStatus(0);
  };

  const handleClickMenu = useCallback(() => {
    setShowMenu(true);
  }, []);

  const handleHideMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleClickEdit = useCallback(() => {
    const token = AuthStorageService.getToken();
    if (isNil(token)) {
      dispatch(
        openSnackbar({ type: 'error', message: '로그인이 필요한 서비스입니다' })
      );
      return;
    }
    dispatch(setRoad({ road }));
    router.push(`/edit?roadId=${roadId}`);
  }, [dispatch, road, roadId, router]);

  const handleRemoveRoad = useCallback(() => {
    const roadIdFromQueryParam = getQueryParam('roadId');
    const token = AuthStorageService.getToken();

    if (isNil(token)) {
      dispatch(
        openSnackbar({ type: 'error', message: '로그인이 필요한 서비스입니다' })
      );
      return;
    }

    if (!isNil(roadIdFromQueryParam)) {
      dispatch(requestRemoveRoad({ roadId: roadIdFromQueryParam }));
    }
  }, [dispatch]);

  const handleClickShare = useCallback(() => {
    if (window.webkit) {
      window.webkit.messageHandlers.handler.postMessage({
        function: 'share',
        data: {
          url: 'https://naver.com',
        },
      });
    }
  }, []);

  const handleClickReport = useCallback(() => {
    dispatch(
      openSnackbar({ type: 'error', message: '신고가 접수완료 되었습니다.' })
    );
  }, [dispatch]);

  const handleClickClose = useCallback(() => {
    if (window.webkit) {
      window.webkit.messageHandlers.handler.postMessage({
        function: 'close',
      });
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => {
        mapRef.current?.mapServiceRef.current?.drawLines(road.routes.toArray());
      }, requestMapTimeout);
    }
  }, [isMounted, road.routes]);

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => {
        mapRef.current?.mapServiceRef.current?.addMarkers(
          road.spots.toArray().map((spot) => ({
            latitude: spot.point.latitude,
            longitude: spot.point.longitude,
          }))
        );
      }, requestMapTimeout);
    }
  }, [isMounted, road.spots]);

  useEffect(() => {
    if (isMounted) {
      const firstRoutes = road.routes.get(0);
      if (!isNil(firstRoutes)) {
        setTimeout(() => {
          mapRef.current?.mapServiceRef.current?.moveTo(
            firstRoutes.latitude,
            firstRoutes.longitude
          );
        }, requestMapTimeout);
      }
    }
  }, [isMounted, road.routes]);

  useEffect(() => {
    if (hasRemoveRoadSuccess) {
      if (window.webkit) {
        window.webkit.messageHandlers.handler.postMessage({
          function: 'close',
        });
      }
    }
  }, [hasRemoveRoadSuccess]);

  return (
    <Layout>
      <Wrapper>
        <MapContainer>
          <div className="mapWrapper" onClick={handleClickMapWrapper}>
            <Map ref={mapRef} />
          </div>
          {/* <ReactionBoxWrapper>
            <ReactionBox />
          </ReactionBoxWrapper> */}
          <BackWrapper onClick={handleClickClose}>
            <img src="/images/detail-back.png" alt="" />
          </BackWrapper>
          <MenuWrapper ref={setTarget} onClick={handleClickMenu}>
            <img src="/images/menu.png" alt="" />
          </MenuWrapper>
          <Overlay
            show={showMenum}
            target={target}
            onHide={handleHideMenu}
            placement={OverlayPosition.BottomRight}
          >
            <MenuList>
              <MenuItem onClick={handleClickEdit}>수정하기</MenuItem>
              <MenuItem onClick={handleRemoveRoad}>삭제하기</MenuItem>
              <MenuItem onClick={handleClickShare}>공유하기</MenuItem>
              <MenuItem onClick={handleClickReport}>신고하기</MenuItem>
            </MenuList>
          </Overlay>
        </MapContainer>

        <BottomSheetWrapper status={bottomSheetStatus}>
          <BottomSheet
            status={bottomSheetStatus}
            setStatus={setBottomSheetStatus}
            roadData={road}
          />
        </BottomSheetWrapper>

        {isOpen && (
          <ImageDetailWrapper>
            <ImageDetail imgUrl={imgUrl} />
          </ImageDetailWrapper>
        )}
      </Wrapper>
    </Layout>
  );
};

Detail.getInitialProps = wrapper.getInitialPageProps((store) => (ctx) => {
  // SSR
  // 여기서 [id] 를 이용해 action dispatch 한 후 컴포넌트에서 Selector로 받아올 수 있음

  const roadId: any = ctx.query.id;
  store.dispatch(requestGetRoad({ roadId }));
});

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const MapContainer = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
  .mapWrapper {
    width: 100%;
    height: 100%;
  }
`;

// const ReactionBoxWrapper = styled.div`
//   position: absolute;
//   bottom: 8px;
//   right: 14px;
//   z-index: 1000;
// `;

const BackWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  z-index: 10000;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const MenuWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  z-index: 10000;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 110px;
  background-color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 38px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  color: #464646;

  &:not(:first-of-type) {
    border-top: 1px solid #e4e4e4;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const BottomSheetWrapper = styled.div<BottomSheetWrapperProps>`
  width: 100%;

  background-color: #f0eee5;
  z-index: 100;

  ${(props) => {
    switch (props.status) {
      case 0:
        return css`
          height: 175px;
        `;
      case 1:
        return css`
          height: 300px;
        `;
      case 2:
        return css`
          height: 100%;
        `;
      default:
        return css`
          height: 300px;
        `;
    }
  }}
`;

export const ImageDetailWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000000;
`;
export default Detail;
