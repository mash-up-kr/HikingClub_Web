/* External dependencies */
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

/* Internal dependencies */
import { addHashTag, removeHashTag } from 'stores/actions/editActions';
import { getHashTags } from 'stores/selectors/editSelectors';
import Input from 'components/atoms/Input';

function RoadHashTag() {
  const dispatch = useDispatch();

  const hashTags = useSelector(getHashTags);

  const [hashTag, setHashTag] = useState('');

  const handleChangeHashTag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.charAt(value.length - 1) === ' ') {
        dispatch(addHashTag({ hashTag }));
        setHashTag('');
      } else {
        setHashTag(value);
      }
    },
    [dispatch, hashTag]
  );

  const handleRemovehashTag = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { hashtag: currentHashTag } = event.currentTarget.dataset;
      dispatch(removeHashTag({ hashTag: currentHashTag! }));
    },
    [dispatch]
  );

  return (
    <Wrapper>
      <Title>태그</Title>
      <Input value={hashTag} leftContent="#" onChange={handleChangeHashTag} />
      {hashTags.size === 0 && (
        <EmptyDescription>
          길을 설명할 수 있는 태그를 붙여주세요.
        </EmptyDescription>
      )}
      <HashTagListWrapper>
        {hashTags.map((tag) => (
          <HashTagWrapper key={tag}>
            <HashTag>{tag}</HashTag>
            <RemoveHashTag data-hashtag={tag} onClick={handleRemovehashTag}>
              <img
                width="16"
                height="16"
                src="/images/remove-hashtag.png"
                alt=""
              />
            </RemoveHashTag>
          </HashTagWrapper>
        ))}
      </HashTagListWrapper>
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

const EmptyDescription = styled.p`
  margin-top: 12px;
  font-size: 12px;
  color: #868686;
`;

const HashTagListWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 23px;
  margin-top: 12px;
`;

const HashTagWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 7px;
  background-color: #f3f3f3;
  border-radius: 4px;

  &:not(:first-of-type) {
    margin-left: 8px;
  }
`;

const HashTag = styled.p`
  font-size: 13px;
  transform: translateY(10%);
`;

const RemoveHashTag = styled.div`
  display: block;
  width: 16px;
  height: 16px;
  margin-left: 2px;
`;

export default RoadHashTag;
