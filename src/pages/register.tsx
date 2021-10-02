import styled from 'styled-components';

import Map from 'components/atoms/Map';
import Layout from 'components/Layout';

function Register() {
  return (
    <Layout>
      <Wrapper>
        <MapWrapper>
          <Map />
        </MapWrapper>
        <BottomSheetWrapper>바텀시트</BottomSheetWrapper>
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
  height: 200px;
`;

export default Register;
