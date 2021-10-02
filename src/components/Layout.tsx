import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom, 0);
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
`;

export default Layout;
