import React, { FC } from 'react';
import styled from 'styled-components';

interface ReactionChipProps {
  count: number;
  image: string;
  isReacted: boolean;
  handleClick?: () => void;
}

interface StyledTextProps {
  isReacted: boolean;
}

const ReactionChip: FC<ReactionChipProps> = (props) => {
  const { image, count, isReacted, handleClick } = props;
  return (
    <Container onClick={handleClick}>
      <Image src={image} />
      <Text isReacted={isReacted}>{count}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 2px;
`;

const Text = styled.div<StyledTextProps>`
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => (props.isReacted ? '#2C7A50' : '#868686')};
`;

export default ReactionChip;
