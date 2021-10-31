import styled from 'styled-components';
import { noop } from 'lodash';

import Input from 'components/atoms/Input';

interface RoadTagProps {
  roadTag?: string;
  roadTagList?: string[];
  onChangeRoadTag?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function LoadTitle({
  roadTag = '',
  roadTagList = [],
  onChangeRoadTag = noop,
}: RoadTagProps) {
  return (
    <Wrapper>
      <Title>태그</Title>
      <Input value={roadTag} leftContent="#" onChange={onChangeRoadTag} />
      <TagListWrapper>
        {roadTagList.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagListWrapper>
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

const TagListWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 23px;
  margin-top: 12px;
`;

const Tag = styled.div`
  padding: 5px 7px;
  font-size: 13px;
  background-color: #f3f3f3;
  border-radius: 4px;

  &:not(:first-of-type) {
    margin-left: 8px;
  }
`;

export default LoadTitle;