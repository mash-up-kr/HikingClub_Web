import type { NextPage } from 'next';
import { useSelector } from 'react-redux';

import Layout from 'components/Layout';
import { wrapper } from 'stores';
import { State } from 'stores/reducer';
import styles from 'styles/Home.module.css';

const Home: NextPage = () => {
  const { test } = useSelector<State, State>((state) => state);

  return (
    <Layout>
      {test}
    </Layout>
  );
};

// SSR
Home.getInitialProps = wrapper.getInitialPageProps((store) => () => {
  store.dispatch({ type: 'TEST', payload: '리덕스 테스트' });
});

export default Home;
