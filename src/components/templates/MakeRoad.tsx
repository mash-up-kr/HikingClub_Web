import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Header from 'components/modules/Header';
import RoadTitle from 'components/modules/RoadTitle';
import RoadMap from 'components/modules/RoadMap';
import RoadTag from 'components/modules/RoadTag';

function MakeLoad() {
  const [roadTitle, setRoadTitle] = useState('');
  const [roadTag, setRoadTag] = useState('');
  const [roadTagList, setRoadTagList] = useState<string[]>([]);

  const handleChangeRoadTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setRoadTitle(value);
    },
    []
  );

  const handleChangeRoadTag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.charAt(value.length - 1) === ' ') {
        setRoadTagList((prev) => [...prev, value]);
        setRoadTag('');
      } else {
        setRoadTag(value);
      }
    },
    []
  );

  return (
    <Wrapper>
      <Header title="길 등록하기" />
      <RoadTitle
        roadTitle={roadTitle}
        onChangeRoadTitle={handleChangeRoadTitle}
      />
      <RoadMap />
      <RoadTag
        roadTag={roadTag}
        roadTagList={roadTagList}
        onChangeRoadTag={handleChangeRoadTag}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

export default MakeLoad;
