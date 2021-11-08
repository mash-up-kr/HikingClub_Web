/* External dependencies */
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  bgColor?: string;
  className?: string;
  children: React.ReactNode;
}

function Button({
  disabled = false,
  loading = false,
  color = 'white',
  bgColor = '#2C7A50',
  className,
  children,
}: ButtonProps) {
  return (
    <StyledButton
      className={className}
      disabled={disabled || loading}
      color={color}
      bgColor={bgColor}
    >
      {loading ? <Rotate /> : children}
    </StyledButton>
  );
}

const StyledButton = styled.button<Omit<ButtonProps, 'loading' | 'children'>>`
  width: 100%;
  height: 54px;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-size: 16px;
  font-weight: 600;
  border: 0;
  border-radius: 8px;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.7;
        `
      : css`
          cursor: pointer;
        `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  width: 14px;
  height: 14px;
  display: inline-block;
  animation: ${rotate} 1.1s linear infinite;
  border: solid 2px white;
  border-top-color: transparent;
  border-radius: 50%;
`;

export default Button;
