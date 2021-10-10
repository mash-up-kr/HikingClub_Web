import styled from 'styled-components';
import { noop } from 'lodash';

import Input from 'components/atoms/Input';

interface LoadTitleProps {
  loadTitle?: string;
  onChangeLoadTitle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function LoadTitle({
  loadTitle = '',
  onChangeLoadTitle = noop,
}: LoadTitleProps) {
  return (
    <Wrapper>
      <Title>길 이름</Title>
      <Input value={loadTitle} onChange={onChangeLoadTitle} />
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

export default LoadTitle;
