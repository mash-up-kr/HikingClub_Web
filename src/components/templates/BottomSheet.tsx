import React from 'react';
import styled from 'styled-components';
import Spot from 'components/atoms/Spot';
import StreetInfo from 'components/modules/StreetInfo';
import ImageList from 'components/modules/ImageList';
import TextArea from 'components/atoms/TextArea';

function BottomSheet() {
  const imgUrls = [
    '/images/image 3.png',
    '/images/image 3.png',
    '/images/image 3.png',
    '/images/image 3.png',
  ];

  return (
    <Container>
      <TopBarWrapper>
        <TopBar src="/images/bar.png" />
      </TopBarWrapper>
      <StreetInfoWrapper>
        <StreetInfo />
      </StreetInfoWrapper>

      <SpotWrapper>
        <Spot />
        <Spot />
        <Spot isFocus={false} />
      </SpotWrapper>

      <ImageListWrapper>
        <ImageList imgUrls={imgUrls} />
      </ImageListWrapper>

      <TextAreaWrapper>
        <TextArea />
      </TextAreaWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopBar = styled.img`
  width: 32px;
  height: 5px;
`;

const StreetInfoWrapper = styled.div`
  padding: 16px;
`;

const SpotWrapper = styled.div`
  margin-top: 20px;
`;

const ImageListWrapper = styled.div`
  margin: 20px;
  /* padding-left: 20px; */
`;

const TextAreaWrapper = styled.div`
  margin: 20px;
`;
export default BottomSheet;
