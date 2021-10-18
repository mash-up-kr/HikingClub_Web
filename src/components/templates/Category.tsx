import React, { useState, useCallback } from 'react';
import Header from 'components/modules/Header';
import styled from 'styled-components';
import PublicText from 'components/atoms/PublicText';
import CategoryCard from 'components/atoms/CategoryCard';
import BasicButton from 'components/atoms/BasicButton';

function Category() {
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
    <Wrapper>
      <Header title="카테고리 선택" />

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
        <BasicButton variant="cancel">취소</BasicButton>
        <BasicButton variant="submit">완료</BasicButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 16px;
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
  gap: 10px;

  // Wrapper 의 box-sizing: border-box 여부에 따라 가운데 정렬이 안되고 짤리는 문제가 있음.
`;
export default Category;
