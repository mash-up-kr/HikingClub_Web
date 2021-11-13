/* External dependencies */
import styled from 'styled-components';

/* Internal dependencies */
import Button from 'components/atoms/Button';

interface RoadSubmitProps {
  onSubmit: () => void;
}

function RoadSubmit({ onSubmit }: RoadSubmitProps) {
  return <SubmitButton onClick={onSubmit}>완료</SubmitButton>;
}

const SubmitButton = styled(Button)`
  margin-top: 34px;
`;

export default RoadSubmit;
