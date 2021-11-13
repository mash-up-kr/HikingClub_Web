import React from 'react';
import styled from 'styled-components';

interface TextAreaProps {
  value: string;
}

function TextArea({ value }: TextAreaProps) {
  // TODO handleChange붙이기

  return <StyledTextArea value={value} disabled />;
}

const StyledTextArea = styled.textarea`
  width: 100%;
  background: #f7f7fb;
  padding: 14px;
  box-sizing: border-box;
  height: 161px;
  border-radius: 8px;

  :focus {
    outline: none;
  }
`;

export default TextArea;
