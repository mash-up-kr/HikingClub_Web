import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';

import Spot from 'components/atoms/Spot';
import StreetInfo from 'components/modules/StreetInfo';
import ImageList from 'components/modules/ImageList';
import TextArea from 'components/atoms/TextArea';
import Road from 'models/Road';

interface BottomSheetProps {
  // 0 축소 1 기본 2 확대
  status: number;
  setStatus: (input: number) => void;
  roadData: Road;
}

interface ContainerProps {
  status: number;
}

const BottomSheet: FC<BottomSheetProps> = (props) => {
  const { title, content, distance, place, category, spots, images, hashtags } =
    props.roadData;

  const handleClickStroke = () => {
    props.setStatus(1);
  };

  const handleClickTopBar = () => {
    props.setStatus(2);
  };

  const spotInits = spots.map((spot, i) => ({
    ...spot,
    id: i,
    isFocus: false,
  }));

  // TODO: handleClickSpot -> setSpotData 이용해서 focus 처리 필요
  const [spotData] = useState(spotInits);

  const handleClickSpot = useCallback(
    (uid: number) => {
      console.log(uid);
    },
    [spotData]
  );

  return (
    <Container status={props.status}>
      {(props.status === 0 || props.status === 1) && (
        <TopBarWrapper onClick={handleClickTopBar}>
          <TopBar src="/images/bar.png" />
        </TopBarWrapper>
      )}
      {props.status === 2 && (
        <TopStrokeWrapper>
          <TopStroke src="/images/stroke.png" onClick={handleClickStroke} />
        </TopStrokeWrapper>
      )}

      <StreetInfoWrapper>
        <StreetInfo
          title={title}
          category={category}
          distance={distance}
          location={place || ''}
          tags={hashtags}
        />
      </StreetInfoWrapper>
      {(props.status === 1 || props.status === 2) && (
        <>
          <SpotWrapper>
            {spotData.map((spot) => {
              return (
                <Spot
                  key={spot.id}
                  id={spot.id}
                  title={spot.title}
                  description={spot.content}
                  isFocus={spot.isFocus}
                  onClick={handleClickSpot}
                />
              );
            })}
          </SpotWrapper>

          <ImageListWrapper>
            <ImageList imgUrls={images} />
          </ImageListWrapper>

          <TextAreaWrapper>
            <TextArea value={content} />
          </TextAreaWrapper>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &&::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  background-color: white;
  border-top-left-radius: ${(props) => (props.status === 2 ? '0px' : '16px')};
  border-top-right-radius: ${(props) => (props.status === 2 ? '0px' : '16px')};
`;

const TopBarWrapper = styled.div`
  width: 100%;
  height: 16px;
  position: sticky;
  background-color: #fff;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const TopBar = styled.img`
  width: 32px;
  height: 5px;
`;

const TopStrokeWrapper = styled.div`
  width: 100%;
  padding: 16px;
  position: sticky;
  top: 0;
  padding: 16px;
`;

const TopStroke = styled.img`
  width: 18.5px;
  height: 8.5px;
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
