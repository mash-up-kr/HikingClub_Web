import styled from 'styled-components';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <Wrapper>
      <CloseWrapper>
        <CloseIcon src="/images/back-icon.png" />
      </CloseWrapper>
      <Title>{title}</Title>
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
`;

const Title = styled.p`
  font-size: 16px;
  line-height: 20px;
`;

const CloseWrapper = styled.div`
  position: absolute;
  left: 16px;
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
