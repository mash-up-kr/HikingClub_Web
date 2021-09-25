import type { NextPage } from "next";

import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { testAction } from "@src/stores/actions";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  return <div className={styles.container}>hello</div>;
};

export default Home;
