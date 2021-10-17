import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openImageDetail } from 'stores/actions';

interface ImageListProps {
  imgUrls: string[];
}

function ImageList({ imgUrls }: ImageListProps) {
  // TODO 스와이프로 넘기는 애니메이션 추가

  const dispatch = useDispatch();

  const handleClick = (url: string) => {
    dispatch(openImageDetail(url));
  };

  return (
    <Container>
      {imgUrls.map((url, idx) => (
        <ImageItem onClick={() => handleClick(url)} key={url + idx} src={url} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
`;

const ImageItem = styled.img`
  width: 157px;
  height: 128px;
  border-radius: 8px;
  cursor: pointer;
`;

export default ImageList;
