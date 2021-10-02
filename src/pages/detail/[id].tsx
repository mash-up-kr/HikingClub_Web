import styled from 'styled-components';

import Map from 'components/atoms/Map';
import Layout from 'components/Layout';
import BottomSheet from 'components/templates/BottomSheet';

function Detail() {


  return (
    <Layout>
      <Wrapper>
        <MapWrapper>
          <Map />
        </MapWrapper>

        <BottomSheetWrapper>
          <BottomSheet />
        </BottomSheetWrapper>

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
  z-index: 100000;
`;

export default Detail;
