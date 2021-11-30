import React, { FC } from 'react';

// import Image from 'next/image';
import styled from 'styled-components';
import Immutable from 'immutable';

// import Bookmark from '../../../public/images/bookmark.svg';
import CategoryText from 'components/atoms/CategoryText';
import Chip from 'components/atoms/Chip';
import LocationText from 'components/atoms/LocationText';
import PublicText from 'components/atoms/PublicText';
import { categoryData } from 'constants/category';

interface StreetInfoProps {
  title?: string;
  category?: string;
  distance?: number;
  location?: string;
  tags?: Immutable.OrderedSet<string>;
}

const BottomCardWrapper = styled.div`
  width: 100%;
  height: 100px;

  .header {
    display: flex;
    justify-content: space-between;
    .textArea {
      display: flex;
      .space {
        margin: 0 4px;
      }
    }
  }

  .info {
    margin: 10px 0 8px;
    .infoSpace {
      margin: 3px 0;
    }
  }

  .tags {
    display: flex;
    .tagContainer {
      margin: 0 6px 0 0;
    }
  }
`;

const BottomCard: FC<StreetInfoProps> = (props) => {
  const {
    title = '단풍나무 산책길',
    category = '단풍',
    distance = 10,
    location = '서울 송파구 위례성대로 134 (방이동)',
    tags = ['#산책', '#한적한', '#자연', '#깨끗한'],
  } = props;

  const walkingTimePerKm = 16;
  const walkingTime = distance * walkingTimePerKm;
  const categoryIconUrl =
    categoryData.find((el) => el.name === category)?.imgUrl ||
    categoryData[0].imgUrl;

  return (
    <BottomCardWrapper>
      <div className="header">
        <div className="textArea">
          <PublicText>{title}</PublicText>
          <div className="space" />
          <CategoryText icon={categoryIconUrl}>{category}</CategoryText>
        </div>
        {/* <Image src={Bookmark} alt="북마크" /> */}
      </div>

      <div className="info">
        <LocationText
          styleType="distance"
          text={`${distance}km (${walkingTime}분)`}
        />
        <div className="infoSpace" />
        <LocationText styleType="location" text={location} />
      </div>

      <div className="tags">
        {tags.map((item, index) => {
          return (
            <div key={index} className="tagContainer">
              <Chip text={item} />
            </div>
          );
        })}
      </div>
    </BottomCardWrapper>
  );
};

export default BottomCard;
