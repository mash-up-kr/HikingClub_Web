import styled from 'styled-components';
import { noop } from 'lodash';

import Input from 'components/atoms/Input';

interface RoadTitleProps {
  roadTitle?: string;
  onChangeRoadTitle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RoadTitle({
  roadTitle = '',
  onChangeRoadTitle = noop,
}: RoadTitleProps) {
  return (
    <Wrapper>
      <Title>길 이름</Title>
      <Input value={roadTitle} onChange={onChangeRoadTitle} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const Title = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 20px;
`;

export default RoadTitle;
