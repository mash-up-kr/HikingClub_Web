import React from 'react';
import Header from 'components/modules/Header';
import styled from 'styled-components';
import PublicText from 'components/atoms/PublicText';
import CategoryCard from 'components/atoms/CategoryCard';
import BasicButton from 'components/atoms/BasicButton';

const mockData = [
  { name: '자연', img: '/images/leaf.png' },
  { name: '야경', img: '/images/leaf.png' },
  { name: '호수', img: '/images/leaf.png' },
  { name: '벚꽃', img: '/images/leaf.png' },
  { name: '운동', img: '/images/leaf.png' },
  { name: '음식', img: '/images/leaf.png' },
  { name: '연인', img: '/images/leaf.png' },
  { name: '가족', img: '/images/leaf.png' },
  { name: '반려견', img: '/images/leaf.png' },
];

function Category() {
  return (
    <Wrapper>
      <Header title="카테고리 선택" />

      <CategoryWrapper>
        <PublicText>카테고리를 선택해 주세요.</PublicText>
        <CategoryCardList>
          {mockData.map((item) => (
            <CategoryCard key={item.name} name={item.name} imgUrl={item.img} />
          ))}
        </CategoryCardList>
      </CategoryWrapper>

      <ButtonWrapper>
        <BasicButton bgColor="#F9F9F9" color="">
          취소
        </BasicButton>
        <BasicButton bgColor="#2C7A50" color="#fff">
          완료
        </BasicButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const CategoryWrapper = styled.div`
  margin-top: 30px;
`;

const CategoryCardList = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 16px;
  display: flex;
  box-sizing: border-box;
  gap: 10px;
`;
export default Category;
