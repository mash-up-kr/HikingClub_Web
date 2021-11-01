/* External Dependencies */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

/* Internal dependencies */
import { closeImageDetail } from 'stores/actions/roadActions';

interface ImageDetailProps {
  imgUrl: string;
}

function ImageDetail({ imgUrl }: ImageDetailProps) {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(closeImageDetail());
  }, [dispatch]);

  return (
    <Container>
      <ImageWrapper>
        <StyledImage src={imgUrl} />
      </ImageWrapper>

      <CloseIconWrapper onClick={handleClick}>
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
