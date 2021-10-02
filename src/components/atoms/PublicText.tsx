import React, { FC } from 'react';

import styled from 'styled-components';

interface StyleProps {
  color?: string;
  fontSize?: string;
  fontWeight?: number;
}

const Text = styled.div<StyleProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

const PublicText: FC<StyleProps> = (props) => {
  const {
    color = '#000000',
    fontSize = '18px',
    fontWeight = 600,
    children,
  } = props;
  return (
    <Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </Text>
  );
};

export default PublicText;
