import React from 'react';
import styled from 'styled-components';

interface CategoryCardProps {
  name: string;
  imgUrl: string;
}

function CategoryCard({ name, imgUrl }: CategoryCardProps) {
  return (
    <Wrapper>
      <CategoryIcon src={imgUrl} alt="카테고리_아이콘" />
      <CategoryName> {name}</CategoryName>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 8px;
  height: 96px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const CategoryIcon = styled.img`
  width: 18px;
  height: 16px;
`;

const CategoryName = styled.span`
  color: #2c7a50;
`;

export default CategoryCard;
