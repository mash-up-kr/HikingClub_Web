import React, { FC } from 'react';

import styled, { css } from 'styled-components';

interface StyleProps {
  color?: string;
  borderRadius?: string;
  backgroundColor?: string;
  fontSize?: string;
}

interface ChipProps extends StyleProps {
  text?: string;
}

const StyledContainer = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  ${(props) => css`
    background-color: ${props.backgroundColor};
    border-radius: ${props.borderRadius};
  `}
`;

const StyledText = styled.div<StyleProps>`
  ${(props) => css`
    color: ${props.color};
    font-size: ${props.fontSize};
  `}
`;

const Chip: FC<ChipProps> = (props) => {
  const {
    text = '예시 텍스트',
    color = '#5a5a5f',
    borderRadius = '4px',
    backgroundColor = '#EEEEF3',
    fontSize = '13px',
  } = props;

  return (
    <StyledContainer
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
    >
      <StyledText color={color} fontSize={fontSize}>
        {text}
      </StyledText>
    </StyledContainer>
  );
};

export default Chip;
