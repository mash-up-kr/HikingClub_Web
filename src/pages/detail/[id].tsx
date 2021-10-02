import styled from 'styled-components';

import Layout from 'components/Layout';

function Detail() {
  return (
    <Layout>
      <Wrapper>상세 페이지</Wrapper>
    </Layout>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Detail;
