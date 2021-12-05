/* External dependencies */
import { useSelector } from 'react-redux';
import styled from 'styled-components';

/* Internal dependencies */
import { getFetching } from 'stores/selectors/editSelectors';
import Button from 'components/atoms/Button';

interface RoadSubmitProps {
  onSubmit: () => void;
}

function RoadSubmit({ onSubmit }: RoadSubmitProps) {
  const isFetching = useSelector(getFetching);
  return (
    <SubmitButton onClick={onSubmit} loading={isFetching}>
      완료
    </SubmitButton>
  );
}

const SubmitButton = styled(Button)`
  margin-top: 34px;
`;

export default RoadSubmit;
