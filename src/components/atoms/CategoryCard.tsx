import React from 'react';
import styled from 'styled-components';

interface CategoryCardProps {
  id: number;
  name: string;
  imgUrl: string;
  selected: boolean;
  onClick: (id: number) => void;
}

function CategoryCard({
  name,
  imgUrl,
  selected,
  id,
  onClick,
}: CategoryCardProps) {
  return (
    <Wrapper onClick={() => onClick(id)} selected={selected}>
      <CategoryIcon src={imgUrl} alt="카테고리_아이콘" />
      <CategoryName> {name}</CategoryName>
    </Wrapper>
  );
}

type CardType = {
  selected: boolean;
};

const Wrapper = styled.div<CardType>`
  border-radius: 8px;
  height: 96px;

  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? '#fff' : '#2c7a50')};
  background-color: ${(props) => (props.selected ? '#4D9E72' : '#f9f9f9')};
`;

const CategoryIcon = styled.img`
  width: 18px;
  height: 16px;
`;

const CategoryName = styled.span``;

export default CategoryCard;
