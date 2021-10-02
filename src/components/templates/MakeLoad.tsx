import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Header from 'components/modules/Header';
import LoadTitle from 'components/modules/LoadTitle';

function MakeLoad() {
  const [loadTitle, setLoadTitle] = useState('');

  const handleChangeLoadTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setLoadTitle(value);
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
