import styled from 'styled-components';

import Map from 'components/atoms/Map';

function LoadMap() {
  return (
    <Wrapper>
      <Title>길 그리기</Title>
      <MapWrapper>
        <Map />
      </MapWrapper>
      <Description>지도를 눌러 길을 그려주세요.</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 32px;
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

export default LoadMap;
