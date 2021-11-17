import React from 'react';
import styled from 'styled-components';

import TermsText from 'components/atoms/TermsText';

function Terms() {
  /* MEMO (@Young-mason) UI 부분은 제외하고 텍스트만 올려달라고 해서, UI 부분 주석처리해두었음 */

  // const handleOnClick = () => {};
  return (
    <Container>
      {/* <Header title="위치기반 서비스 이용약관" showBackIcon /> */}
      <TermsText />
      {/* <ButtonWrapper>
        <Button>동의</Button>
      </ButtonWrapper> */}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

// const ButtonWrapper = styled.div`
//   padding: 0 10px;
// `;
export default Terms;
