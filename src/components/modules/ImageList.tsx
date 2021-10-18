import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openImageDetail } from 'stores/actions';

interface ImageListProps {
  imgUrls: string[];
}

function ImageList({ imgUrls }: ImageListProps) {
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      const { url } = event.currentTarget.dataset;
      dispatch(openImageDetail(url || ''));
    },
    [dispatch]
  );

  return (
    <Container>
      {imgUrls.map((url, idx) => (
        <ImageItem
          data-url={url}
          onClick={handleClick}
          key={url + idx}
          src={url}
        />
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
