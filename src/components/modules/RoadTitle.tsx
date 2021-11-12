/* External dependencies */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

/* Internal dependencies */
import { setTitle } from 'stores/actions/editActions';
import { getTitle } from 'stores/selectors/editSelectors';
import Input from 'components/atoms/Input';

function RoadTitle() {
  const dispatch = useDispatch();

  const title = useSelector(getTitle);

  const handleChangeRoadTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      dispatch(setTitle({ title: value }));
    },
    [dispatch]
  );

  return (
    <Wrapper>
      <Title>길 이름</Title>
      <Input value={title} onChange={handleChangeRoadTitle} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 36px;
`;

const Title = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 20px;
`;

export default RoadTitle;
