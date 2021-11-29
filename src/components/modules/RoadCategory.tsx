import React, { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Category from 'components/templates/Category';
import Input from 'components/atoms/Input';
import { getCategoryId } from 'stores/selectors/editSelectors';
import { categoryData } from 'constants/category';

function RoadCategory() {
  const [enableCategory, setEnableCategory] = useState(false);
  const categoryId = useSelector(getCategoryId);

  const handleClickCategory = useCallback(() => {
    setEnableCategory(true);
  }, []);

  const handleClickCloseCategory = useCallback(() => {
    setEnableCategory(false);
  }, []);

  const categoryName = useMemo(
    () =>
      categoryData.find((item) => item.id === categoryId)?.name ||
      '카테고리를 선택해주세요',
    [categoryId]
  );

  return (
    <>
      <Wrapper onClick={handleClickCategory}>
        <Title>카테고리</Title>

        <InputWrapper onClick={() => null}>
          <Input disabled rightAngleBracket value={categoryName} />
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
