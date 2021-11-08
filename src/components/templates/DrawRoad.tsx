/* External dependencies */
import { useMemo } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

/* Internal dependencies */
import { getRootElement } from 'utils/domUtils';
import Header from 'components/modules/Header';
import Map from 'components/atoms/Map';

interface DrawRoadProps {
  onClickCloseMap: () => void;
}

function DrawRoad({ onClickCloseMap }: DrawRoadProps) {
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
          <Map />
        </MapWrapper>
      </Container>
    ),
    [onClickCloseMap]
  );

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
`;

const MapWrapper = styled.div`
  flex: 1;
  width: 100%;
`;

export default DrawRoad;
