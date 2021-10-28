import React, { FC } from 'react';

import Leaf from '../../../public/images/leaf.svg';
import Image from 'next/image';
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
`;

const StyleText = styled.div<StyleProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.color};
  font-weight: ${(props) => props.color};
`;

const CategoryText: FC<CategoryTextProps> = (props) => {
  const {
    icon = Leaf,
    fontSize = '14px',
    color = '#038F5D',
    fontWeight = 600,
    children,
  } = props;

  return (
    <StyleView>
      <Image src={icon} alt="카테고리" />
      <StyleText fontSize={fontSize} color={color} fontWeight={fontWeight}>
        {children}
      </StyleText>
    </StyleView>
  );
};

export default CategoryText;
