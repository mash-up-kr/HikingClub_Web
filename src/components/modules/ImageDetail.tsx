import React from 'react';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeImageDetail } from 'stores/actions';

interface ImageDetailProps {
  imageUrl: string;
}

function ImageDetail({ imageUrl }: ImageDetailProps) {
  const dispatch = useDispatch();

  return (
    <Container>
      <ImageWrapper>
        <StyledImage src={imageUrl} />
      </ImageWrapper>

      <CloseIconWrapper onClick={() => dispatch(closeImageDetail())}>
        <CloseIcon src="/images/close-icon.png" />
      </CloseIconWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
  position: relative;
  backdrop-filter: blur(40px); // bg 컬러가 있는 컴포넌트만 먹힘.
`;

const ImageWrapper = styled.div``;

const StyledImage = styled.img`
  width: 100%;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export default ImageDetail;
