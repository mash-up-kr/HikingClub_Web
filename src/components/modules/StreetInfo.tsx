import React, { FC } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

import Bookmark from 'assets/images/bookmark.svg';
import Leaf from 'assets/images/leaf.svg';
import CategoryText from 'components/atoms/CategoryText';
import Chip from 'components/atoms/Chip';
import LocationText from 'components/atoms/LocationText';
import PublicText from 'components/atoms/PublicText';

interface StreetInfoProps {
  title?: string;
  category?: string;
  categoryIcon?: string;
  distance?: string;
  location?: string;
  tags?: string[];
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
    categoryIcon = Leaf,
    category = '단풍',
    distance = '0.8km (11분)',
    location = '서울 송파구 위례성대로 134 (방이동)',
    tags = ['#산책', '#한적한', '#자연', '#깨끗한'],
  } = props;
  return (
    <BottomCardWrapper>
      <div className="header">
        <div className="textArea">
          <PublicText>{title}</PublicText>
          <div className="space" />
          <CategoryText icon={categoryIcon}>{category}</CategoryText>
        </div>
        <Image src={Bookmark} alt="북마크" />
      </div>

      <div className="info">
        <LocationText styleType="distance" text={distance} />
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
