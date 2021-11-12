/* External dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

/* Internal dependencies */
import * as roadSelectors from 'stores/selectors/roadSelectors';
import { requestGetRoad } from 'stores/actions/roadActions';
import Map from 'components/atoms/Map';
import Layout from 'components/Layout';
import BottomSheet from 'components/templates/BottomSheet';
import ImageDetail from 'components/modules/ImageDetail';
import ReactionBox from 'components/modules/ReactionBox';

interface BottomSheetWrapperProps {
  status: number;
}

function Detail() {
  const dispatch = useDispatch();

  const imgDetail = useSelector(roadSelectors.getImgDetail);
  const { isOpen, imgUrl } = imgDetail;

  // 0 축소 1 기본 2 확장
  const [bottomSheetStatus, setBottomSheetStatus] = useState(1);

  useEffect(() => {
    /* FIXME: (@danivelop) 테스트로 임시로 1을 넣음. 나중에 수정필요 */
    dispatch(requestGetRoad({ roadId: '1' }));
  }, [dispatch]);

  const handleClickMapWrapper = () => {
    setBottomSheetStatus(0);
  };

  return (
    <Layout>
      <Wrapper>
        <MapContainer>
          <div className="mapWrapper" onClick={handleClickMapWrapper}>
            <Map />
          </div>
          <ReactionBoxWrapper>
            <ReactionBox />
          </ReactionBoxWrapper>
        </MapContainer>

        <BottomSheetWrapper status={bottomSheetStatus}>
          <BottomSheet
            status={bottomSheetStatus}
            setStatus={setBottomSheetStatus}
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
}

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

const ReactionBoxWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  right: 14px;
  z-index: 1000;
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
  z-index: 200;
`;
export default Detail;
