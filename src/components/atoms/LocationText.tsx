import React, { FC } from 'react';

import styled, { css } from 'styled-components';

const LocationText: FC<LocationTextProps> = (props) => {
  const { styleType = 'location', text = '예시 텍스트' } = props;

  const iconUrl =
    styleType === 'location'
      ? '/icons/icon_location.png'
      : '/icons/icon_footprint.png';

  return (
    <StyleView>
      <StyledImage src={iconUrl} alt="위치" className="locationIcon" />
      <StyleText styleType={styleType}>{text}</StyleText>
    </StyleView>
  );
};

const LocationStyle = css`
  font-size: 14px;
  color: #5a5a5f;
  font-weight: 400;
`;

const DistanceStyle = css`
  font-size: 14px;
  color: #2c7a50;
  font-weight: 700;
`;

interface StyleProps {
  styleType?: 'location' | 'distance';
}

interface LocationTextProps extends StyleProps {
  text?: string;
}

const StyleView = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StyleText = styled.div<StyleProps>`
  margin: 0 0 0 7px;
  ${(props) => (props.styleType === 'location' ? LocationStyle : DistanceStyle)}
`;

const StyledImage = styled.img`
  width: 16px;
  height: 16px;
`;

export default LocationText;
