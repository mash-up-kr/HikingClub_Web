/* External dependencies */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { isNil } from 'lodash';

/* Internal dependencies */
import {
  getTitle,
  getContent,
  getDistance,
  getHashTags,
  getRoutes,
  getSpots,
  getImages,
  getRoadId,
  getSuccess,
  getCategoryId,
} from 'stores/selectors/editSelectors';
import {
  initialize,
  requestCreateRoad,
  requestUpdateRoad,
} from 'stores/actions/editActions';
import { getQueryParam } from 'utils/urlUtils';
import Header from 'components/modules/Header';
import RoadTitle from 'components/modules/RoadTitle';
import RoadMap from 'components/modules/RoadMap';
import RoadHashTag from 'components/modules/RoadHashTag';
import RoadContent from 'components/modules/RoadContent';
import RoadSubmit from 'components/modules/RoadSubmit';
import RoadCategory from 'components/modules/RoadCategory';
import RoadImageUploader from 'components/modules/RoadImageUploader';

declare global {
  interface Window {
    webkit: any;
  }
}

function MakeRoad() {
  const dispatch = useDispatch();
  const router = useRouter();

  const title = useSelector(getTitle);
  const content = useSelector(getContent);
  const distance = useSelector(getDistance);
  const hashtags = useSelector(getHashTags);
  const routes = useSelector(getRoutes);
  const spots = useSelector(getSpots);
  const images = useSelector(getImages);
  const categoryId = useSelector(getCategoryId);

  const hasSuccess = useSelector(getSuccess);
  const successRoadId = useSelector(getRoadId);

  const [roadImages, setRoadImages] = useState<FormData | string[]>([]);
  const [roadId, setRoadId] = useState('');

  const handleChangeRoadImages = useCallback((formData: FormData) => {
    setRoadImages(formData);
  }, []);

  const handleClickClose = useCallback(() => {
    if (window.webkit) {
      window.webkit.messageHandlers.handler.postMessage({
        function: 'close',
      });
    }
    router.back();
  }, [router]);

  const handleSubmit = useCallback(() => {
    if (roadId !== 'new') {
      const payload = {
        roadId,
        title,
        content,
        distance: 3,
        categoryId,
        routes: routes
          .toArray()
          .map((route) => [route.longitude, route.latitude]),
        placeCode: '1123052',
        spots: spots.toArray().map((spot) => ({
          title: spot.title,
          content: spot.content,
          point: [spot.point.longitude, spot.point.latitude],
        })),
        hashtags: hashtags.toArray(),
        images: images.toArray(),
      };

      dispatch(requestUpdateRoad(payload));
    } else {
      const payload = {
        title,
        content,
        distance: 3,
        categoryId,
        routes: routes
          .toArray()
          .map((route) => [route.longitude, route.latitude]),
        placeCode: '1123052',
        spots: spots.toArray().map((spot) => ({
          title: spot.title,
          content: spot.content,
          point: [spot.point.longitude, spot.point.latitude],
        })),
        hashtags: hashtags.toArray(),
        images: images.toArray(),
      };

      dispatch(requestCreateRoad(payload));
    }
  }, [
    content,
    dispatch,
    distance,
    hashtags,
    images,
    roadId,
    routes,
    spots,
    title,
    categoryId,
  ]);

  useEffect(() => {
    const roadIdFromQueryParam = getQueryParam('roadId');
    if (!isNil(roadIdFromQueryParam)) {
      setRoadId(roadIdFromQueryParam);
    }
  }, []);

  useEffect(() => {
    if (hasSuccess) {
      router.replace(`/detail?roadId=${successRoadId}`);
    }
  }, [hasSuccess, router, successRoadId]);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  return (
    <Wrapper>
      <Header
        title="길 등록하기"
        showCloseIcon
        onClickClose={handleClickClose}
      />
      <ItemWrapper>
        <RoadTitle />
        <RoadMap />
        <RoadHashTag />
        <RoadCategory />
        <RoadImageUploader
          roadImages={roadImages}
          onChangeRoadImages={handleChangeRoadImages}
        />
        <RoadContent />
        <RoadSubmit onSubmit={handleSubmit} />
      </ItemWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 16px 30px;
  box-sizing: border-box;
`;

export default MakeRoad;
