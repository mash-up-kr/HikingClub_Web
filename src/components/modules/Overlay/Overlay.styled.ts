/* External dependencies */
import styled, { css } from 'styled-components';

export interface StyledOverlayProps {
  isHidden: boolean;
  transition: boolean;
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledOverlay = styled.div<StyledOverlayProps>`
  position: absolute;

  ${({ isHidden }) =>
    isHidden &&
    css`
      visibility: hidden;
    `}

  ${({ transition }) =>
    transition &&
    css`
      transition: 'top 0.3s, left 0.3s';
    `}
`;
