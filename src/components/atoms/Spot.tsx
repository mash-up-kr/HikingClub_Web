import React, { FC } from 'react';

import styled from 'styled-components';

interface SpotProps {
  title?: string;
  description?: string;
  isFocus?: boolean;
}

interface SpotWrapperProps {
  isFocus: boolean;
}

const SpotWrapper = styled.div<SpotWrapperProps>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 15px;
  box-sizing: border-box;
  background-color: ${(props) => (props.isFocus ? '#F7F7FB' : '#ffffff')};

  border-top: 1px solid #e4e4e4;
`;

const SpotText = styled.div`
  margin-left: 14px;
  .title {
    color: #28282d;
    font-size: 14px;
    font-weight: 500;
  }

  .description {
    color: #5a5a5f;
    font-size: 12px;
    font-weight: 400;
  }
`;

const StyledImage = styled.img`
  width: 20px;
  height: 20px;
`;

const Spot: FC<SpotProps> = (props) => {
  const {
    title = '예시타이틀',
    description = '예시 설명',
    isFocus = false,
  } = props;

  return (
    <SpotWrapper isFocus={isFocus}>
      <StyledImage src="/icons/icon_star_circle.png" alt="스팟" />
      <SpotText>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </SpotText>
    </SpotWrapper>
  );
};

export default Spot;
