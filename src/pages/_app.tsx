import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { wrapper } from 'stores';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
