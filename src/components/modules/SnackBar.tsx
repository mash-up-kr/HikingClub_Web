import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import * as layoutSelectors from 'stores/selectors/layoutSelectors';
import { closeSnackbar } from 'stores/actions/layoutActions';

function SnackBar() {
  const dispatch = useDispatch();
  const { type, message, open } = useSelector(layoutSelectors.getSnackBarState);

  const handleClose = useCallback(() => {
    setTimeout(() => {
      dispatch(closeSnackbar());
    }, 2000);
  }, [dispatch]);

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [open, handleClose]);

  return (
    <>
      {open && (
        <Wrapper type={type}>
          <Content>
            <IconWrapper>
              {type === 'success' ? (
                <Icon src="/icons/icon_check.png" alt="success" />
              ) : (
                <Icon src="/icons/icon_exclamation.png" alt="error" />
              )}
            </IconWrapper>
            <Text>{message}</Text>
          </Content>
        </Wrapper>
      )}
    </>
  );
}

interface SnackbarWrapperProps {
  type: 'success' | 'error';
}

const Wrapper = styled.div<SnackbarWrapperProps>`
  width: 343px;
  height: 48px;
  background-color: ${(props) =>
    props.type === 'success' ? '#4D9E72' : '#e56c62'};

  position: absolute;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  z-index: 100;

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Text = styled.p`
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
  padding-top: 2.5px;
`;

const IconWrapper = styled.div`
  background-color: #fff;
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  /* align-items: center; */
  border-radius: 50%;
`;

const Icon = styled.img``;

export default SnackBar;
