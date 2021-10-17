import styled from 'styled-components';

import Map from 'components/atoms/Map';
import Layout from 'components/Layout';
import BottomSheet from 'components/templates/BottomSheet';
import ImageDetail from 'components/modules/ImageDetail';
import { State } from 'stores/reducer';
import { useSelector } from 'react-redux';

function Detail() {
  const { imgDetail } = useSelector<State, State>((state) => state);
  const { isOpen, imgUrl } = imgDetail;

  return (
    <Layout>
      <Wrapper>
        <MapWrapper>
          <Map />
        </MapWrapper>

        <BottomSheetWrapper>
          <BottomSheet />
        </BottomSheetWrapper>

        {isOpen && (
          <ImageDetailWrapper>
            <ImageDetail imageUrl={imgUrl} />
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

export const MapWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

export const BottomSheetWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0eee5;
  z-index: 100;
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
