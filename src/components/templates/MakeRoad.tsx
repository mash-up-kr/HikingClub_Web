/* External dependencies */
import styled from 'styled-components';

/* Internal dependencies */
import Header from 'components/modules/Header';
import RoadTitle from 'components/modules/RoadTitle';
import RoadMap from 'components/modules/RoadMap';
import RoadHashTag from 'components/modules/RoadHashTag';
import RoadContent from 'components/modules/RoadContent';
import React from 'react';

function MakeLoad() {
  return (
    <Wrapper>
      <Header title="길 등록하기" />
      <RoadTitle />
      <RoadMap />
      <RoadHashTag />
      <RoadContent />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px 30px;
  overflow-y: auto;
  box-sizing: border-box;
`;

export default MakeLoad;
