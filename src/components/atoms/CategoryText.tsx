import React, { FC } from 'react';

// import Image from 'next/image';
import styled from 'styled-components';

interface StyleProps {
  fontSize?: string;
  color?: string;
  fontWeight?: number;
}

interface CategoryTextProps extends StyleProps {
  icon?: string;
}

const StyleView = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const StyleText = styled.div<StyleProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.color};
  font-weight: ${(props) => props.color};
`;

const CategoryText: FC<CategoryTextProps> = (props) => {
  const {
    icon,
    fontSize = '14px',
    color = '#038F5D',
    fontWeight = 600,
    children,
  } = props;

  return (
    <StyleView>
      <CategoryImage src={icon} alt="카테고리" />
      <StyleText fontSize={fontSize} color={color} fontWeight={fontWeight}>
        {children}
      </StyleText>
    </StyleView>
  );
};

const CategoryImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 2px;
`;

export default CategoryText;
