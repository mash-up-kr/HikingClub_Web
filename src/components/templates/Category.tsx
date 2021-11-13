import React, { useState, useCallback } from 'react';
import Header from 'components/modules/Header';
import styled, { css } from 'styled-components';
import PublicText from 'components/atoms/PublicText';
import CategoryCard from 'components/atoms/CategoryCard';
import Button from 'components/atoms/Button';

interface CategoryProps {
  show: boolean;
  onClickCloseCategory: () => void;
}

function Category({ show = false, onClickCloseCategory }: CategoryProps) {
  const [cards, setCards] = useState([
    // 카테고리 아이콘을 png로 구현할지, svg로 구현할지 판단이 어려워서 우선 png로 붙여놨음.
    //  -> selected 값에 따라 색깔 안바뀜
    { id: 0, name: '자연', img: '/images/leaf.png', selected: false },
    { id: 1, name: '야경', img: '/images/leaf.png', selected: false },
    { id: 2, name: '호수', img: '/images/leaf.png', selected: false },
    { id: 3, name: '벚꽃', img: '/images/leaf.png', selected: false },
    { id: 4, name: '운동', img: '/images/leaf.png', selected: false },
    { id: 5, name: '음식', img: '/images/leaf.png', selected: false },
    { id: 6, name: '연인', img: '/images/leaf.png', selected: false },
    { id: 7, name: '가족', img: '/images/leaf.png', selected: false },
    { id: 8, name: '반려견', img: '/images/leaf.png', selected: false },
  ]);

  const handleClick = useCallback(
    (id: number) => {
      const newCards = [...cards];
      const index = newCards.findIndex((card) => card.id === id);

      newCards[index] = {
        ...newCards[index],
        selected: !newCards[index].selected,
      };

      setCards(newCards);
    },
    [cards]
  );

  return (
    <Container show={show}>
      {' '}
      <Header
        title="카테고리 선택"
        showBackIcon
        showCloseIcon
        onClickClose={onClickCloseCategory}
      />
      <CategoryWrapper>
        <PublicText>카테고리를 선택해 주세요.</PublicText>
        <CategoryCardList>
          {cards.map((item) => (
            <CategoryCard
              key={item.id}
              onClick={handleClick}
              id={item.id}
              selected={item.selected}
              name={item.name}
              imgUrl={item.img}
            />
          ))}
        </CategoryCardList>
      </CategoryWrapper>
      <ButtonWrapper>
        <OptionButton bgColor="#F9F9F9" color="" onClick={onClickCloseCategory}>
          취소
        </OptionButton>
        <OptionButton bgColor="#2C7A50" color="#fff">
          완료
        </OptionButton>
      </ButtonWrapper>{' '}
    </Container>
  );
}

const Container = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  background-color: white;

  padding: 0 16px;
  box-sizing: border-box;

  ${({ show }) =>
    show &&
    css`
      transform: translateY(0%);
    `}

  z-index: 100;
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
  width: 100%;
  display: flex;
  margin: auto 0 16px;
  gap: 10px;
`;

const OptionButton = styled(Button)`
  width: calc(50% - 5px);
`;

export default Category;
