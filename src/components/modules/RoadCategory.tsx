import React from 'react';
import styled from 'styled-components';

import Input from 'components/atoms/Input';

function RoadCategory() {
  return (
    <Wrapper>
      <Title>카테고리</Title>

      <InputWrapper onClick={() => null}>
        <Input disabled rightAngleBracket value="카테고리를 선택해주세요" />
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 36px;
`;

const Title = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 20px;
`;

const InputWrapper = styled.div``;

export default RoadCategory;
