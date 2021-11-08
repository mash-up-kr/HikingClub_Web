/* External dependencies */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

/* Internal dependencies */
import { setContent } from 'stores/actions/editActions';
import { getContent } from 'stores/selectors/editSelectors';

function RoadContent() {
  const dispatch = useDispatch();

  const content = useSelector(getContent);

  const handleChangeContent = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      dispatch(setContent({ content: value }));
    },
    [dispatch]
  );

  return (
    <Wrapper>
      <Title>설명</Title>
      <Content
        value={content}
        placeholder="길에 대한 설명을 작성해주세요."
        onChange={handleChangeContent}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const Title = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 20px;
`;

const Content = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 16px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border: 0;
  border-radius: 8px;

  &:focus {
    outline: none;
  }
`;

export default RoadContent;
