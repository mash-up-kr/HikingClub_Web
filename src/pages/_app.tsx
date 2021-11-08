import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { wrapper } from 'stores';
import SnackBar from 'components/modules/SnackBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SnackBar />
    </>
  );
}

export default wrapper.withRedux(MyApp);
