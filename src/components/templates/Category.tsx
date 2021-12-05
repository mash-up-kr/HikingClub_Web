import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';

import Header from 'components/modules/Header';
import PublicText from 'components/atoms/PublicText';
import CategoryCard from 'components/atoms/CategoryCard';
import Button from 'components/atoms/Button';
import { addCategory } from 'stores/actions/editActions';

import { categoryData } from 'constants/category';

interface CategoryProps {
  show: boolean;
  onClickCloseCategory: () => void;
}

function Category({ show = false, onClickCloseCategory }: CategoryProps) {
  const [cards, setCards] = useState(categoryData);
  const dispatch = useDispatch();

  const handleClickCard = useCallback(
    (id: number) => {
      const newCards = [...cards].map((card) => {
        if (card.id === id) {
          return { ...card, selected: true };
        }

        return { ...card, selected: false };
      });

      setCards(newCards);
    },
    [cards]
  );

  const handleClickCompleteButton = useCallback(() => {
    const categoryId = cards.find((card) => card.selected)?.id || 0;

    dispatch(addCategory({ categoryId }));

    onClickCloseCategory();
  }, [onClickCloseCategory, dispatch, cards]);

  return (
    <Container show={show}>
      <Header
        title="카테고리 선택"
        showBackIcon
        onClickBack={onClickCloseCategory}
      />
      <CategoryWrapper>
        <PublicText>카테고리를 선택해 주세요.</PublicText>
        <CategoryCardList>
          {cards.map((item) => (
            <CategoryCard
              key={item.id}
              onClick={() => handleClickCard(item.id)}
              id={item.id}
              selected={item.selected}
              name={item.name}
              imgUrl={item.imgUrl}
            />
          ))}
        </CategoryCardList>
      </CategoryWrapper>
      <ButtonWrapper>
        <OptionButton bgColor="#F9F9F9" color="" onClick={onClickCloseCategory}>
          취소
        </OptionButton>
        <OptionButton
          bgColor="#2C7A50"
          color="#fff"
          onClick={handleClickCompleteButton}
        >
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

  z-index: 1000000;
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
