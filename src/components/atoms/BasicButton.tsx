import styled from 'styled-components';

type ButtonType = {
  bgColor: string;
  color: string;
};

const BasicButton = styled.button<ButtonType>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  height: 54px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  font-size: 16px;
  font-weight: 600px;
`;
export default BasicButton;
