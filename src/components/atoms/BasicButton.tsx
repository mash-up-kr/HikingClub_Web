import styled from 'styled-components';

interface BasicButtonProps {
  variant: 'cancel' | 'submit';
  children: string;
}

function BasicButton({ variant, children }: BasicButtonProps) {
  return (
    <StyledButton variant={variant} type="button">
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<BasicButtonProps>`
  background-color: ${(props) =>
    props.variant === 'submit' ? '#2C7A50' : '#F9F9F9'};
  color: ${(props) => (props.variant === 'submit' ? '#F9F9F9' : '')};
  height: 54px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  font-size: 16px;
  font-weight: 600px;
`;
export default BasicButton;
