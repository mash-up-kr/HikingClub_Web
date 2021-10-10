import styled from 'styled-components';
import { isEmpty, noop } from 'lodash';
import React from 'react';

interface InputProps {
  value?: string;
  leftContent?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ value = '', leftContent, onChange = noop }: InputProps) {
  return (
    <InputWrapper>
      {!isEmpty(leftContent) && <PreContent>{leftContent}</PreContent>}
      <StyledInput value={value} onChange={onChange} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 68px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border: 1px solid #f3f3f3;
  border-radius: 16px;
`;

const PreContent = styled.p`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const StyledInput = styled.input`
  flex: 1;
  height: 100%;
  font-size: 18px;
  background-color: transparent;
  border: 0;

  &:focus {
    outline: none;
  }
`;

export default Input;
