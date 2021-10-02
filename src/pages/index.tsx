import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { State } from "@src/stores/reducer";
import { wrapper } from "@src/stores";
import styled from "styled-components";

const Home: NextPage = () => {
  const { test } = useSelector<State, State>((state) => state);

  return <div className={styles.container}>{test}</div>;
};

// SSR
Home.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    ({ pathname, req, res }) => {
      store.dispatch({ type: "TEST", payload: "리덕스 테스트" });
    }
);

export default Home;
