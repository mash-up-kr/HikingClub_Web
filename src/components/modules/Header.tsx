/* External dependencies */
import styled from 'styled-components';
import { noop } from 'lodash';

interface HeaderProps {
  title: string;
  showBackIcon?: boolean;
  showCloseIcon?: boolean;
  className?: string;
  onClickBack?: () => void;
  onClickClose?: () => void;
}

function Header({
  title,
  showBackIcon = false,
  showCloseIcon = false,
  className,
  onClickBack = noop,
  onClickClose = noop,
}: HeaderProps) {
  return (
    <Wrapper className={className}>
      {showBackIcon && (
        <BackWrapper onClick={onClickBack}>
          <BackIcon src="/images/back-icon.png" />
        </BackWrapper>
      )}
      <Title>{title}</Title>
      {showCloseIcon && (
        <CloseWrapper onClick={onClickClose}>
          <CloseIcon src="/images/close-icon-black.png" />
        </CloseWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 18px 0;
  background-color: white;
`;

const Title = styled.p`
  font-size: 16px;
  line-height: 20px;
`;

const BackWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
`;

const BackIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const CloseWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
`;

const CloseIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export default Header;
