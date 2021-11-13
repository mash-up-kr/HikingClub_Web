import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Category from 'components/templates/Category';
import Input from 'components/atoms/Input';

function RoadCategory() {
  const [enableCategory, setEnableCategory] = useState(false);

  const handleClickCategory = useCallback(() => {
    setEnableCategory(true);
  }, []);

  const handleClickCloseCategory = useCallback(() => {
    setEnableCategory(false);
  }, []);

  return (
    <>
      <Wrapper onClick={handleClickCategory}>
        <Title>카테고리</Title>

        <InputWrapper onClick={() => null}>
          <Input disabled rightAngleBracket value="카테고리를 선택해주세요" />
        </InputWrapper>
      </Wrapper>
      <Category
        show={enableCategory}
        onClickCloseCategory={handleClickCloseCategory}
      />
    </>
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
