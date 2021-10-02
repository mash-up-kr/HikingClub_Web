/* eslint-disable react/jsx-props-no-spreading */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/*
*
*
_document.js는 index.html을 꾸며주는거다라고 생각하면 된다.
ServerStyleSheet을 사용하여 서버사이드렌더링을 하게 할 수 있다.
전체적으로 css를 주고 싶은 부분은 createGlobalStyle을 사용하여 가능하다.

const GlobalStyles = createGlobalStyle`
       html, body {
            height: 100%;
            overflow: auto;
          }
          #__next {
            height: 100%;
          }
`;

*
*
*/

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet(); // 스타일드 컴포넌트를 서버사이드 렌더링 할 수 있게함.
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="theme-color" content="#4D9E72" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
