/* External dependencies */
import styled from 'styled-components';

/* Internal dependencies */
import Header from 'components/modules/Header';
import RoadTitle from 'components/modules/RoadTitle';
import RoadMap from 'components/modules/RoadMap';
import RoadHashTag from 'components/modules/RoadHashTag';

function MakeLoad() {
  return (
    <Wrapper>
      <Header title="길 등록하기" />
      <RoadTitle />
      <RoadMap />
      <RoadHashTag />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

export default MakeLoad;
