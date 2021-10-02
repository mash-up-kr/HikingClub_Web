import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Header from 'components/modules/Header';
import LoadTitle from 'components/modules/LoadTitle';
import LoadMap from 'components/modules/LoadMap';
import LoadTag from 'components/modules/LoadTag';

function MakeLoad() {
  const [loadTitle, setLoadTitle] = useState('');
  const [loadTag, setLoadTag] = useState('');
  const [loadTagList, setLoadTagList] = useState<string[]>([]);

  const handleChangeLoadTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setLoadTitle(value);
    },
    []
  );

  const handleChangeLoadTag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.charAt(value.length - 1) === ' ') {
        setLoadTagList((prev) => [...prev, value]);
        setLoadTag('');
      } else {
        setLoadTag(value);
      }
    },
    []
  );

  return (
    <Wrapper>
      <Header title="길 등록하기" />
      <LoadTitle
        loadTitle={loadTitle}
        onChangeLoadTitle={handleChangeLoadTitle}
      />
      <LoadMap />
      <LoadTag
        loadTag={loadTag}
        loadTagList={loadTagList}
        onChangeLoadTag={handleChangeLoadTag}
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
