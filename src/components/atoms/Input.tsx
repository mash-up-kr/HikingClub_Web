/* External dependencies */
import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';
import { isEmpty, noop } from 'lodash';

interface InputProps {
  className?: string;
  value?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  disabled?: boolean;
  rightAngleBracket?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input(
  {
    className,
    value = '',
    leftContent,
    rightContent,
    disabled = false,
    rightAngleBracket = false,
    placeholder = '',
    onChange = noop,
    onFocus = noop,
    onBlur = noop,
    onKeyDown = noop,
  }: InputProps,
  forwardedRef: Ref<HTMLInputElement>
) {
  return (
    <InputWrapper className={className}>
      {!isEmpty(leftContent) && <PreContent>{leftContent}</PreContent>}
      <StyledInput
        ref={forwardedRef}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {!isEmpty(rightContent) && <PreContent>{rightContent}</PreContent>}
      {rightAngleBracket && (
        <Icon src="/icons/icon_front.png" alt="right_angle_bracket" />
      )}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 68px;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 18px;
  background-color: #f9f9f9;
  border: 1px solid #f3f3f3;
  border-radius: 16px;

  align-items: center;
`;

const PreContent = styled.p`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const StyledInput = styled.input`
  flex: 1;
  height: 100%;
  font-size: inherit;
  background-color: transparent;
  border: 0;

  &:focus {
    outline: none;
  }
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

export default forwardRef(Input);
