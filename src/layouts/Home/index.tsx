import { FunctionComponent, ReactChild, ReactElement } from "react";
import Header from "../../components/Header";
import styles from "./HomeLayout.module.css";

const HomeLayout: FunctionComponent = ({ children }) => (
  <div className={styles.wrapper}>
    <Header />
    <main>
      {children}
    </main>
  </div>
);

export default HomeLayout;